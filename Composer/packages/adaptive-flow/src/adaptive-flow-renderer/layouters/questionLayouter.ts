// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BranchIntervalX, BranchIntervalY, ElementInterval } from '../constants/ElementSizes';
import { GraphNode } from '../models/GraphNode';
import { GraphLayout } from '../models/GraphLayout';
import { Edge, EdgeDirection } from '../models/EdgeData';
import { QuestionType } from '../widgets/Question/QuestionType';
import { Boundary } from '../models/Boundary';
import { GraphCoord } from '../models/GraphCoord';
import { DT } from '../models/GraphDistanceUtils';

export function questionLayouter(
  questionNode: GraphNode | null,
  choiceNodes: GraphNode[],
  branchNodes: GraphNode[] = []
): GraphLayout {
  if (!questionNode) {
    return new GraphLayout();
  }
  const questionType = questionNode?.data?.type;

  switch (questionType) {
    case QuestionType.choice:
      return questionLayouterBranchingWithConvergence(questionNode, choiceNodes, branchNodes);
    case QuestionType.confirm:
      return questionLayouterBranching(questionNode, choiceNodes, branchNodes);
    case QuestionType.text:
    case QuestionType.number:
    default:
      return questionLayouterNonBranching(questionNode);
  }
}

/**
 *        [question]
 *           |
 *       ------------
 *      |   |  |   |
 */
function questionLayouterBranching(
  questionNode: GraphNode | null,
  choiceNodes: GraphNode[],
  branchNodes: GraphNode[] = []
): GraphLayout {
  if (!questionNode || !branchNodes.length) {
    return new GraphLayout();
  }

  const choiceWithBranchNodes: GraphCoord[] = [];
  for (let i = 0; i < Math.min(choiceNodes.length, branchNodes.length); i++) {
    choiceWithBranchNodes.push(
      new GraphCoord(choiceNodes[i], [[branchNodes[i], [DT.AxisX, 0], [DT.BottomMargin, ElementInterval.y]]])
    );
  }

  const contentCoord = GraphCoord.topAlignWithInterval(choiceWithBranchNodes, BranchIntervalX, false);
  // HACK: increase bottom space to hide following nodes if any
  // TODO: the good approach is only allow question nodes created at the end of actions
  contentCoord.boundary.height += 200;
  const questionCoord = new GraphCoord(questionNode, [
    [contentCoord, [DT.AxisX, 0], [DT.BottomMargin, BranchIntervalY * 2]],
  ]);
  questionCoord.moveCoordTo(0, 0);

  const edges: Edge[] = calculateEdges(questionCoord.boundary, questionNode, branchNodes);

  return {
    boundary: questionCoord.boundary,
    nodeMap: { questionNode, choiceNodes: choiceNodes as any, branchNodes: branchNodes as any },
    edges,
    nodes: [],
  };
}

/**
 *        [question]
 *           |
 *       ------------
 *      |   |  |   |
 */
function questionLayouterBranchingWithConvergence(
  questionNode: GraphNode | null,
  choiceNodes: GraphNode[],
  branchNodes: GraphNode[] = []
): GraphLayout {
  if (!questionNode || !branchNodes.length) {
    return new GraphLayout();
  }

  /** Build convergence index map */
  // choiceIndex => caseIndex
  const convergenceMap: Map<number, number> = new Map();
  choiceNodes.forEach((node, choiceIndex) => {
    const { gotoChoice } = node.data;
    if (!gotoChoice || gotoChoice === node?.data?.choiceId) return;
    const caseIndex = branchNodes.findIndex((n) => n.data.choiceId === gotoChoice);
    if (caseIndex > -1) convergenceMap.set(choiceIndex, caseIndex);
  });

  if (convergenceMap.size === 0) {
    return questionLayouterBranching(questionNode, choiceNodes, branchNodes);
  }

  // [caseIndex, [choiceIndex1, choiceIndex2, ...]]
  const connections: [number, number[]][] = [];
  for (let iChoice = 0; iChoice < choiceNodes.length; iChoice++) {
    const iCase = convergenceMap.get(iChoice) ?? iChoice;
    if (connections[iCase]) {
      connections[iCase][1].push(iChoice);
    } else {
      connections[iCase] = [iCase, [iChoice]];
    }
  }

  // Some cases are unreachable. Mark as hidden.
  for (let i = 0; i < branchNodes.length; i++) {
    if (!connections[i]) branchNodes[i].hidden = true;
  }

  /** Convergence positioning logic */
  const compositedBranchCoords: GraphCoord[] = [];
  const reachableConnections: [number, number[]][] = connections.filter(Boolean);
  for (const [caseIdx, choiceIndices] of reachableConnections) {
    const choices = choiceIndices.map((i) => choiceNodes[i]);
    const choicesGroupCoord = GraphCoord.topAlignWithInterval(choices, BranchIntervalX, false);
    const branch = branchNodes[caseIdx];
    const branchCoord = new GraphCoord(choicesGroupCoord, [
      [branch, [DT.AxisX, 0], [DT.BottomMargin, ElementInterval.y]],
    ]);
    compositedBranchCoords.push(branchCoord);
  }

  const contentCoord = GraphCoord.topAlignWithInterval(compositedBranchCoords, BranchIntervalX, false);
  const rootCoord = new GraphCoord(questionNode, [
    [contentCoord, [DT.AxisX, 0], [DT.BottomMargin, BranchIntervalY * 2]],
  ]);
  rootCoord.moveCoordTo(0, 0);

  /** Draw edges */
  const edges: Edge[] = [];

  edges.push({
    id: `edge/${questionNode.id}/q->baseline`,
    direction: EdgeDirection.Down,
    x: questionNode.offset.x + questionNode.boundary.axisX,
    y: questionNode.offset.y + questionNode.boundary.height,
    length: BranchIntervalY,
  });
  const BaselineUnderQuestionPosY = questionNode.offset.y + questionNode.boundary.height + BranchIntervalY;
  const firstChocie = choiceNodes[0];
  const lastChoice = choiceNodes[choiceNodes.length - 1];
  edges.push({
    id: `edge/${questionNode.id}/baseline`,
    direction: EdgeDirection.Right,
    x: firstChocie.offset.x + firstChocie.boundary.axisX,
    y: BaselineUnderQuestionPosY,
    length: lastChoice.offset.x + lastChoice.boundary.axisX - (firstChocie.offset.x + firstChocie.boundary.axisX),
  });

  for (const [caseIdx, choiceIndices] of reachableConnections) {
    const converged = choiceIndices.length > 1;
    for (const choiceIdx of choiceIndices) {
      const choice = choiceNodes[choiceIdx];
      edges.push({
        id: `edge/${choice.id}/baseline->choice`,
        direction: EdgeDirection.Down,
        x: choice.offset.x + choice.boundary.axisX,
        y: BaselineUnderQuestionPosY,
        length: BranchIntervalY,
      });
      edges.push({
        id: `edge/${choice.id}/choice->mid-baseline`,
        direction: EdgeDirection.Down,
        x: choice.offset.x + choice.boundary.axisX,
        y: choice.offset.y + choice.boundary.height,
        // Converged choices have an extra baseline. This length will be shorter if choices heigh are different.
        length: converged ? ElementInterval.y / 2 : ElementInterval.y,
      });
    }
    // merge converged edges
    if (converged) {
      const branch = branchNodes[caseIdx];
      edges.push({
        id: `edge/${branch.id}/mid-baseline->case`,
        direction: EdgeDirection.Up,
        x: branch.offset.x + branch.boundary.axisX,
        y: branch.offset.y,
        length: BranchIntervalY,
      });

      const cFirst = choiceNodes[choiceIndices[0]];
      const cLast = choiceNodes[choiceIndices[choiceIndices.length - 1]];
      edges.push({
        id: `edge/${branch.id}/converged/mid-baseline`,
        direction: EdgeDirection.Right,
        x: cFirst.offset.x + cFirst.boundary.axisX,
        y: cFirst.offset.y + cFirst.boundary.height + ElementInterval.y / 2,
        length: cLast.offset.x + cLast.boundary.axisX - (cFirst.offset.x + cFirst.boundary.axisX),
      });
    }
  }

  return {
    boundary: rootCoord.boundary,
    nodeMap: { questionNode, choiceNodes: choiceNodes as any, branchNodes: branchNodes as any },
    edges,
    nodes: [],
  };
}

function calculateEdges(containerBoundary: Boundary, questionNode: GraphNode, branchNodes: GraphNode[]) {
  const edges: Edge[] = [];
  edges.push({
    id: `edge/${questionNode.id}/switch/condition->switch`,
    direction: EdgeDirection.Down,
    x: containerBoundary.axisX,
    y: questionNode.offset.y + questionNode.boundary.height,
    length: BranchIntervalY,
  });

  const BaselinePositionY = questionNode.offset.y + questionNode.boundary.height + BranchIntervalY;
  branchNodes.forEach((x) => {
    edges.push({
      id: `edge/${questionNode.id}/case/baseline->${x.id}`,
      direction: EdgeDirection.Down,
      x: x.offset.x + x.boundary.axisX,
      y: BaselinePositionY,
      length: x.offset.y - BaselinePositionY,
      options: { label: x.data.label },
    });
  });

  if (branchNodes.length > 1) {
    const firstBranchNode = branchNodes[0] || new GraphNode();
    const lastBranchNode = branchNodes[branchNodes.length - 1] || new GraphNode();
    const linePositionX = firstBranchNode.offset.x + firstBranchNode.boundary.axisX;
    const baseLineLength = lastBranchNode.offset.x + lastBranchNode.boundary.axisX - linePositionX;

    edges.push({
      id: `edge/${questionNode.id}/baseline`,
      direction: EdgeDirection.Right,
      x: linePositionX,
      y: BaselinePositionY,
      length: baseLineLength,
    });
  }
  return edges;
}

function questionLayouterNonBranching(questionNode: GraphNode): GraphLayout {
  return {
    boundary: new Boundary(300, 286),
    nodeMap: { questionNode },
    edges: [],
    nodes: [],
  };
}
