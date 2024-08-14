/**
 * @generated SignedSource<<e528a87d2366a048880768c515f56958>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type newTransactionMutation$variables = {
  receiverAccountNumber: string;
  senderAccountNumber: string;
  value: number;
};
export type newTransactionMutation$data = {
  readonly newTransaction: {
    readonly createdAt: string | null | undefined;
    readonly id: string | null | undefined;
    readonly value: number | null | undefined;
  } | null | undefined;
};
export type newTransactionMutation = {
  response: newTransactionMutation$data;
  variables: newTransactionMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "receiverAccountNumber"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "senderAccountNumber"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "value"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "receiverAccountNumber",
        "variableName": "receiverAccountNumber"
      },
      {
        "kind": "Variable",
        "name": "senderAccountNumber",
        "variableName": "senderAccountNumber"
      },
      {
        "kind": "Variable",
        "name": "value",
        "variableName": "value"
      }
    ],
    "concreteType": "Transaction",
    "kind": "LinkedField",
    "name": "newTransaction",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "value",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createdAt",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "newTransactionMutation",
    "selections": (v1/*: any*/),
    "type": "Mutations",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "newTransactionMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c73e670b62069bec73672a421f1b6d38",
    "id": null,
    "metadata": {},
    "name": "newTransactionMutation",
    "operationKind": "mutation",
    "text": "mutation newTransactionMutation(\n  $receiverAccountNumber: String!\n  $senderAccountNumber: String!\n  $value: Int!\n) {\n  newTransaction(receiverAccountNumber: $receiverAccountNumber, senderAccountNumber: $senderAccountNumber, value: $value) {\n    id\n    value\n    createdAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "fd2521cce064dba6c339fc6ed9c761e7";

export default node;
