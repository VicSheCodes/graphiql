import { OperationDefinitionNode } from 'graphql';
import { QueryFacts } from '../utility/getQueryFacts';

type FetcherParams = {
  query: string;
  operationName: string;
  variables?: string;
};
type FetcherResult =
  | string
  | {
      data: JSON;
    };

export type Fetcher = (
  graphQLParams: FetcherParams,
) => Promise<FetcherResult> | Observable<FetcherResult>;

// These type just taken from https://github.com/ReactiveX/rxjs/blob/master/src/internal/types.ts#L41
type Unsubscribable = {
  unsubscribe: () => void;
};

type Observable<T> = {
  subscribe(opts: {
    next: (value: T) => void;
    error: (error: any) => void;
    complete: () => void;
  }): Unsubscribable;
  subscribe(
    next: (value: T) => void,
    error: null | undefined,
    complete: () => void,
  ): Unsubscribable;
  subscribe(
    next?: (value: T) => void,
    error?: (error: any) => void,
    complete?: () => void,
  ): Unsubscribable;
};

export type File = {
  uri: string;
  text?: string;
  json?: JSON;
  formattedText?: string;
};

export type GraphQLParams = {
  query: string;
  variables?: string;
  operationName?: string;
};

export type SchemaConfig = {
  uri: string;
  assumeValid?: boolean;
};

export type EditorContexts = 'operation' | 'variables' | 'results';

export type SessionState = {
  sessionId: number;
  operation: File;
  variables: File;
  results: File;
  operationLoading: boolean;
  operationErrors: string[] | null;
  editors: { [key in EditorContexts]: CodeMirror.Editor };
  // diagnostics?: IMarkerData[];
  currentTabs?: { [pane: string]: number }; // maybe this could live in another context for each "pane"? within session context
  operations: OperationDefinitionNode[];
  subscription?: Unsubscribable | null;
} & QueryFacts;
