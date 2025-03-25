import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

interface ProofResponse {
  success: boolean;
  proofHash: string;
  output: string;
  username: string;
  iq_score: number;
  timestamp: number;
  verified: boolean;
}

if (!process.env.NEXT_PUBLIC_PROOF_API_URL) {
  console.log("NEXT_PROOF_API_URL is not defined");
  throw new Error("NEXT_PROOF_API_URL is not defined");
}

export async function verifyIQScore(
  username: string,
  score: number
): Promise<ProofResponse> {
  try {
    const response = await axios.post<ProofResponse>(
      `${process.env.NEXT_PUBLIC_PROOF_API_URL}/api/generate-proof`,
      {
        username: username,
        iq_score: score, 
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else if (response.status === 400) {
      throw new Error("Bad request. Please check the input parameters.");
    } else if (response.status === 500) {
      throw new Error("Server error. Please try again later.");
    } else {
      throw new Error(`Unexpected error: ${response.status}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Axios error: ${error.message}`);
    } else {
      if (error instanceof Error) {
        throw new Error(`Unexpected error: ${error.message}`);
      } else {
        throw new Error("Unexpected error");
      }
    }
  }
}
