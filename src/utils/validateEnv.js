export function getBackendUrl() {
  const host = process.env.REACT_APP_BACKEND_APP_HOST;
  const port = process.env.REACT_APP_BACKEND_APP_PORT;
  const baseUrl = process.env.REACT_APP_BACKEND_APP_BASE_URL;

  console.log('Environment Variables:', { host, port, baseUrl }); // Debug environment variables

  if (!host || !port || !baseUrl) {
    throw new Error(
      'Environment variables REACT_APP_BACKEND_APP_HOST, REACT_APP_BACKEND_APP_PORT, or REACT_APP_BACKEND_APP_BASE_URL are not defined.'
    );
  }

  return `https://${host}:${port}${baseUrl}`;
}
