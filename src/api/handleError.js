import { Cookies, LocalStorage } from "quasar";
import notify from "src/api/notify.js";

export default function handleError(error) {
  let msg = "Something went wrong";
  let code = 500;

  switch (error?.response?.status) {
    case 401:
      code = 401;
      msg = `Unauthorized: Access denied`;
      Cookies.remove("token");
      LocalStorage.remove("settings");
      window.location.href = "/login";
      break;
    case 403:
      code = 403;
      msg = error?.response?.data?.message || "Unauthorized action.";
      break;
    case 404:
      code = 404;
      msg = error?.response?.data.message || error?.response?.statusText;
      break;
    case 413:
      code = 413;
      msg = "File too large. Please try uploading a smaller file.";
      break;
    case 422:
      code = 422;
      msg = error?.response?.data.message || msg;
      break;
    case 429:
      code = 429;
      msg = error?.response?.data.message || msg;
      break;
    case 500:
      code = 500;
      const str = error?.response?.data.message;

      if (str.includes("No connection") || str.includes("no connection")) {
        msg = "Database connection error";
      } else if (str.includes("Integrity constraint violation")) {
        const match = str.match(/Column '(\w+)' cannot be null/);
        if (match) {
          let fieldName = match[1].replace(/_/g, " ");
          fieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
          msg = `${fieldName} field cannot be null`;
        } else {
          msg = "An integrity constraint violation occurred.";
        }
      } else {
        msg =
          "We're sorry, but an unexpected error occurred while processing your request.";
      }
      break;
    default:
      code = error?.response?.status || 500;
      if (
        error.response !== undefined &&
        error?.response?.data !== undefined &&
        error?.response?.data.errors !== undefined
      ) {
        // Handle validation errors
        const errors = [];
        for (const [key, err] of Object.entries(error?.response?.data.errors)) {
          errors.push(`${key}: ${err[0]}`);
        }
        msg = errors.join("\n"); // Use newline character instead of <br>
      } else if (
        error.response !== undefined &&
        error?.response?.data !== undefined &&
        error?.response?.data.message !== undefined
      ) {
        msg = error?.response?.data.message;
      } else if (error.request) {
        code = 500;
        msg = "No response received from server.";
      }
      break;
  }

  if (msg.toLowerCase() === "CSRF token mismatch.") {
    Cookies.remove("token");
    LocalStorage.remove("settings");
  }

  if (error.code === 0) {
    code = 500;
    msg = "No internet connection. Please check your network settings.";
  }

  notify(msg, "error");

  return {
    status: code,
    message: msg,
  };
}
