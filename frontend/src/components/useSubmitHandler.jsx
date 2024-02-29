import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSubmitHandler = (route) => {
  const navigate = useNavigate();

  async function submitHandler(body) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/user/${route}`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const json = await response.json();

      if (json.success) {
        // Redirect to dashboard if signup is successful
        navigate("/dashboard");
      } else {
        console.error("Error:", json.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return { submitHandler }; // Return both the submitHandler function and status state
};

export default useSubmitHandler;

// import React, { useState } from "react";

// const useSubmitHandler = (body) => {
//   const [status, setStatus] = useState(false);

//   async function submitHandler() {
//     try {
//       const response = await fetch("http://localhost:3000/api/v1/user/signup", {
//         method: "POST",
//         body: JSON.stringify(body),
//         headers: { "Content-Type": "application/json" },
//       });

//       if (!response.ok) {
//         throw new Error("Request failed");
//       }

//       const json = await response.json();

//       if (json.success) {
//         // Redirect to dashboard if signup is successful
//         setStatus(true);
//       } else {
//         console.error("Error:", json.message);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }
//   submitHandler();
//   return status;
// };
