import { Button, Progress } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface HeaderProps {
  heart: number;
  point: number;
  playerName: string;
  setIsModalOpen: (yes: boolean) => void;
}

const Header = ({
  heart = 3,
  point = 100,
  playerName = "NoName",
  setIsModalOpen,
}: HeaderProps) => {
  const router = useRouter();
  const [percent, setPercent] = useState<number>(100);

  const [timeLeft, setTimeLeft] = useState(100);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft || !percent) {
      setIsModalOpen(true);
      return;
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
      setPercent(percent - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft, percent, setIsModalOpen]);

  return (
    <header className="flex flex-col flex-none mx-auto w-full bg-white sticky left-0 top-0 z-10 border-b border-gray-200 header-modal-custom">
      <nav className="sm:flex items-center px-4 lg:px-5 py-4 order-1 shadow-sm justify-around">
        <div className="flex items-center md:w-1/2 md:justify-center">
          <div className="mr-4">Trái tym: </div>

          {Array(heart)
            ?.fill("a")
            ?.map((item, index) => (
              <svg
                key={`asnca-${item}-${index}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                style={{ fill: "#ff0d0d", width: 35 }}
              >
                <path d="M 9.5 5 C 5.363281 5 2 8.402344 2 12.5 C 2 13.929688 2.648438 15.167969 3.25 16.0625 C 3.851563 16.957031 4.46875 17.53125 4.46875 17.53125 L 15.28125 28.375 L 16 29.09375 L 16.71875 28.375 L 27.53125 17.53125 C 27.53125 17.53125 30 15.355469 30 12.5 C 30 8.402344 26.636719 5 22.5 5 C 19.066406 5 16.855469 7.066406 16 7.9375 C 15.144531 7.066406 12.933594 5 9.5 5 Z M 9.5 7 C 12.488281 7 15.25 9.90625 15.25 9.90625 L 16 10.75 L 16.75 9.90625 C 16.75 9.90625 19.511719 7 22.5 7 C 25.542969 7 28 9.496094 28 12.5 C 28 14.042969 26.125 16.125 26.125 16.125 L 16 26.25 L 5.875 16.125 C 5.875 16.125 5.390625 15.660156 4.90625 14.9375 C 4.421875 14.214844 4 13.273438 4 12.5 C 4 9.496094 6.457031 7 9.5 7 Z" />
              </svg>
            ))}

          <div style={{ width: 200 }} className="ml-10 flex">
            <Progress percent={percent} showInfo={false} />
            <div className="ml-2">{timeLeft}</div>
          </div>
        </div>

        <div className="flex items-center md:w-1/2 justify-end">
          Điểm của {playerName} :{" "}
          <span className="text-blue-600 ml-2 text-xl font-semibold">
            {point * 100}
          </span>
          <div className="ml-28 md:ml-50 xl:ml-72">
            <Button
              type="link"
              onClick={() => {
                localStorage.setItem("playerName", "");
                router?.push("/");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
