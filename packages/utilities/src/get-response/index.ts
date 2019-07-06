export interface ErrorState {
  error: boolean;
  message: string;
  status: number;
}

export interface SuccessState {
  ok: boolean;
}

export const getErrorResponse = (response: Response): ErrorState => ({
  error: true,
  message: `Error ${response.status}`,
  status: response.status
});

export const getSuccessResponse = async (
  response: Response
): Promise<SuccessState> => {
  const json = await response.json();
  return {
    ...json,
    ok: true
  };
};
