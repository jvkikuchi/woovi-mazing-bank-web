/**
 * @generated SignedSource<<5a8579a5df4345ec3834ccb06ca57fc4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type getAccountQuery$variables = {
  accountNumber: string;
};
export type getAccountQuery$data = {
  readonly getAccount: {
    readonly createdAt: string | null | undefined;
    readonly deletedAt: string | null | undefined;
    readonly id: string | null | undefined;
    readonly ledger: ReadonlyArray<{
      readonly createdAt: string | null | undefined;
      readonly value: number | null | undefined;
    } | null | undefined> | null | undefined;
    readonly number: string | null | undefined;
    readonly transactions: ReadonlyArray<{
      readonly createdAt: string | null | undefined;
      readonly receiverAccountNumber: string | null | undefined;
      readonly senderAccountNumber: string | null | undefined;
      readonly value: number | null | undefined;
    } | null | undefined> | null | undefined;
    readonly updatedAt: string | null | undefined;
  } | null | undefined;
};
export type getAccountQuery = {
  response: getAccountQuery$data;
  variables: getAccountQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "accountNumber"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "number",
        "variableName": "accountNumber"
      }
    ],
    "concreteType": "AccountWithTransactions",
    "kind": "LinkedField",
    "name": "getAccount",
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
        "name": "number",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Ledger",
        "kind": "LinkedField",
        "name": "ledger",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Transaction",
        "kind": "LinkedField",
        "name": "transactions",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "senderAccountNumber",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "receiverAccountNumber",
            "storageKey": null
          },
          (v1/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      },
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "updatedAt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "deletedAt",
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
    "name": "getAccountQuery",
    "selections": (v3/*: any*/),
    "type": "Queries",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "getAccountQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "04bc37c5f367bba0735fc3d93f660ebd",
    "id": null,
    "metadata": {},
    "name": "getAccountQuery",
    "operationKind": "query",
    "text": "query getAccountQuery(\n  $accountNumber: String!\n) {\n  getAccount(number: $accountNumber) {\n    id\n    number\n    ledger {\n      value\n      createdAt\n    }\n    transactions {\n      senderAccountNumber\n      receiverAccountNumber\n      value\n      createdAt\n    }\n    createdAt\n    updatedAt\n    deletedAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "b2b6ae2008d12242bba1a7552530fa69";

export default node;
