/**
 * @generated SignedSource<<4f6819cca2fcf23335e585a2c4779e07>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type createUserMutation$variables = {
  email: string;
  name: string;
  password: string;
  surname: string;
};
export type createUserMutation$data = {
  readonly createUser: {
    readonly token: string | null | undefined;
  } | null | undefined;
};
export type createUserMutation = {
  response: createUserMutation$data;
  variables: createUserMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "email"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "password"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "surname"
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email"
      },
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name"
      },
      {
        "kind": "Variable",
        "name": "password",
        "variableName": "password"
      },
      {
        "kind": "Variable",
        "name": "surname",
        "variableName": "surname"
      }
    ],
    "concreteType": "UserLoginType",
    "kind": "LinkedField",
    "name": "createUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "token",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "createUserMutation",
    "selections": (v4/*: any*/),
    "type": "Mutations",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "createUserMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "de9530d0ccf13b8b196d706c29638373",
    "id": null,
    "metadata": {},
    "name": "createUserMutation",
    "operationKind": "mutation",
    "text": "mutation createUserMutation(\n  $name: String!\n  $surname: String!\n  $email: String!\n  $password: String!\n) {\n  createUser(name: $name, surname: $surname, email: $email, password: $password) {\n    token\n  }\n}\n"
  }
};
})();

(node as any).hash = "36ce1dd521a19513ecdff9e32428e324";

export default node;
