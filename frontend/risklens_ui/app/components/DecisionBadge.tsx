import Image from "next/image";
import React from "react";

type DecisionType = "Approve" | "Review" | "Reject" | string;

const decisionConfig: Record<string, {
  img: string;
  text: string;
}> = {
  Approve: {
    img: "/green_check.png",
    text: "Low default risk detected. Credit facility approved subject to standard terms and conditions."
  },
  Review: {
    img: "/yellow_manual.png",
    text: "Medium default risk detected. Manual review is required before a final decision."
  },
  Reject: {
    img: "/red_reject.png",
    text: "High default risk detected. Credit facility cannot be approved at this time."
  }
};

const DecisionBadge = ({ decision }: { decision?: DecisionType }) => {
  const config = decisionConfig[decision ?? ""] ?? null;

  if (!config) return null;

  return (
    <div className="flex justify-center items-center p-8">
      <div className="flex flex-col p-6 gap-3 justify-center items-center w-125 shadow-xl bg-gray-100 rounded-md">
        <Image
          src={config.img}
          alt ={decision ?? "Decision"}
          height={120}
          width={120}
        />
        <p className="font-semibold text-lg">{decision}</p>
        <p className="text-center text-sm text-gray-700">
          {config.text}
        </p>
      </div>
    </div>
  );
};

export default DecisionBadge;
