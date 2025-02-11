import React from "react";

export const metadata = {
  title: "About - AGI Moment",
  description: "About AGI Moment - Exploring the future of artificial general intelligence",
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">About AGI Moment</h1>
        <p className="text-xl mb-4">
          AGI Moment is dedicated to exploring and advancing the field of artificial general intelligence.
        </p>
        <p className="text-lg mb-4">
          Our mission is to contribute to the development of safe and beneficial AGI systems that can help solve humanity's most pressing challenges.
        </p>
      </div>
    </main>
  );
}
