/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface OnchainRiddleInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "bot"
      | "isActive"
      | "riddle"
      | "setRiddle"
      | "submitAnswer"
      | "winner"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "AnswerAttempt" | "RiddleSet" | "Winner"
  ): EventFragment;

  encodeFunctionData(functionFragment: "bot", values?: undefined): string;
  encodeFunctionData(functionFragment: "isActive", values?: undefined): string;
  encodeFunctionData(functionFragment: "riddle", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setRiddle",
    values: [string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "submitAnswer",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "winner", values?: undefined): string;

  decodeFunctionResult(functionFragment: "bot", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isActive", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "riddle", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRiddle", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "submitAnswer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "winner", data: BytesLike): Result;
}

export namespace AnswerAttemptEvent {
  export type InputTuple = [user: AddressLike, correct: boolean];
  export type OutputTuple = [user: string, correct: boolean];
  export interface OutputObject {
    user: string;
    correct: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RiddleSetEvent {
  export type InputTuple = [riddle: string];
  export type OutputTuple = [riddle: string];
  export interface OutputObject {
    riddle: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace WinnerEvent {
  export type InputTuple = [user: AddressLike];
  export type OutputTuple = [user: string];
  export interface OutputObject {
    user: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface OnchainRiddle extends BaseContract {
  connect(runner?: ContractRunner | null): OnchainRiddle;
  waitForDeployment(): Promise<this>;

  interface: OnchainRiddleInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  bot: TypedContractMethod<[], [string], "view">;

  isActive: TypedContractMethod<[], [boolean], "view">;

  riddle: TypedContractMethod<[], [string], "view">;

  setRiddle: TypedContractMethod<
    [_riddle: string, _answerHash: BytesLike],
    [void],
    "nonpayable"
  >;

  submitAnswer: TypedContractMethod<[_answer: string], [void], "nonpayable">;

  winner: TypedContractMethod<[], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "bot"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "isActive"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "riddle"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "setRiddle"
  ): TypedContractMethod<
    [_riddle: string, _answerHash: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "submitAnswer"
  ): TypedContractMethod<[_answer: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "winner"
  ): TypedContractMethod<[], [string], "view">;

  getEvent(
    key: "AnswerAttempt"
  ): TypedContractEvent<
    AnswerAttemptEvent.InputTuple,
    AnswerAttemptEvent.OutputTuple,
    AnswerAttemptEvent.OutputObject
  >;
  getEvent(
    key: "RiddleSet"
  ): TypedContractEvent<
    RiddleSetEvent.InputTuple,
    RiddleSetEvent.OutputTuple,
    RiddleSetEvent.OutputObject
  >;
  getEvent(
    key: "Winner"
  ): TypedContractEvent<
    WinnerEvent.InputTuple,
    WinnerEvent.OutputTuple,
    WinnerEvent.OutputObject
  >;

  filters: {
    "AnswerAttempt(address,bool)": TypedContractEvent<
      AnswerAttemptEvent.InputTuple,
      AnswerAttemptEvent.OutputTuple,
      AnswerAttemptEvent.OutputObject
    >;
    AnswerAttempt: TypedContractEvent<
      AnswerAttemptEvent.InputTuple,
      AnswerAttemptEvent.OutputTuple,
      AnswerAttemptEvent.OutputObject
    >;

    "RiddleSet(string)": TypedContractEvent<
      RiddleSetEvent.InputTuple,
      RiddleSetEvent.OutputTuple,
      RiddleSetEvent.OutputObject
    >;
    RiddleSet: TypedContractEvent<
      RiddleSetEvent.InputTuple,
      RiddleSetEvent.OutputTuple,
      RiddleSetEvent.OutputObject
    >;

    "Winner(address)": TypedContractEvent<
      WinnerEvent.InputTuple,
      WinnerEvent.OutputTuple,
      WinnerEvent.OutputObject
    >;
    Winner: TypedContractEvent<
      WinnerEvent.InputTuple,
      WinnerEvent.OutputTuple,
      WinnerEvent.OutputObject
    >;
  };
}
