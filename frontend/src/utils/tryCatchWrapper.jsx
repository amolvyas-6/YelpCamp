export default async function tryCatchWrapper(asyncFunc, navigate) {
  try {
    await asyncFunc();
  } catch (error) {
    navigate("/error", {
      state: {
        errorCode: error.response?.status,
        errorMessage: error.response?.data.message,
        errorStack: error.stack,
      },
    });
  }
}
