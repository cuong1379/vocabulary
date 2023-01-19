import React, { useEffect, useRef, useState } from "react";
import { Card, List, Modal, Watermark } from "antd";
import { listE1, listE2 } from "../constant/constant";
import Header from "./container/Header";
import { useRouter } from "next/router";

const Synonyms = () => {
  const router = useRouter();

  const [listShuff, setListShuff] = useState<string[]>([]);
  const [firstWord, setFirstWord] = useState("");
  const [secondWord, setSecondWord] = useState("");

  const [point, setPoint] = useState(0);
  const [heart, setHeart] = useState(3);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const sysRef = useRef<any>();

  const shuffledArr = (array: string[]) =>
    array.sort(() => 0.5 - Math.random());

  useEffect(() => {
    const level = Number(router?.query?.level);
    const newListE1Cut = listE1?.slice(0, level ? level * 10 : 10);
    const newListE2Cut = listE2?.slice(0, level ? level * 10 : 10);
    const listShuffed = shuffledArr([...newListE1Cut, ...newListE2Cut]);
    setListShuff(listShuffed);
  }, [router?.query?.level]);

  const handleCheck = (item: string) => {
    sysRef.current.querySelector(
      `.synonyms-card-${item
        ?.replaceAll(" ", "")
        ?.replaceAll("/", "")
        ?.replaceAll(",", "")}`
    ).childNodes[0].style.backgroundColor = "bisque";

    if (!firstWord && !secondWord) {
      setFirstWord(item);
    } else {
      setSecondWord(item);
    }
  };

  useEffect(() => {
    if (firstWord && secondWord) {
      if (
        (listE1?.indexOf(firstWord) == listE2?.indexOf(secondWord) &&
          listE1?.indexOf(firstWord) != -1) ||
        (listE1?.indexOf(secondWord) == listE2?.indexOf(firstWord) &&
          listE1?.indexOf(secondWord) != -1)
      ) {
        //dung
        sysRef.current.querySelector(
          `.synonyms-card-${firstWord
            ?.replaceAll(" ", "")
            ?.replaceAll("/", "")
            ?.replaceAll(",", "")}`
        ).childNodes[0].style.backgroundColor = "aquamarine";

        sysRef.current.querySelector(
          `.synonyms-card-${secondWord
            ?.replaceAll(" ", "")
            ?.replaceAll("/", "")
            ?.replaceAll(",", "")}`
        ).childNodes[0].style.backgroundColor = "aquamarine";

        setTimeout(() => {
          sysRef.current.querySelector(
            `.synonyms-card-${firstWord
              ?.replaceAll(" ", "")
              ?.replaceAll("/", "")
              ?.replaceAll(",", "")}`
          ).childNodes[0].style.opacity = "0.3";

          sysRef.current.querySelector(
            `.synonyms-card-${secondWord
              ?.replaceAll(" ", "")
              ?.replaceAll("/", "")
              ?.replaceAll(",", "")}`
          ).childNodes[0].style.opacity = "0.3";

          setPoint(point + 1);
        }, 500);
      } else {
        //sai

        sysRef.current.querySelector(
          `.synonyms-card-${firstWord
            ?.replaceAll(" ", "")
            ?.replaceAll("/", "")
            ?.replaceAll(",", "")}`
        ).childNodes[0].style.backgroundColor = "red";

        sysRef.current.querySelector(
          `.synonyms-card-${secondWord
            ?.replaceAll(" ", "")
            ?.replaceAll("/", "")
            ?.replaceAll(",", "")}`
        ).childNodes[0].style.backgroundColor = "red";

        setTimeout(() => {
          sysRef.current.querySelector(
            `.synonyms-card-${firstWord
              ?.replaceAll(" ", "")
              ?.replaceAll("/", "")
              ?.replaceAll(",", "")}`
          ).childNodes[0].style.backgroundColor = "#ebebeb";

          sysRef.current.querySelector(
            `.synonyms-card-${secondWord
              ?.replaceAll(" ", "")
              ?.replaceAll("/", "")
              ?.replaceAll(",", "")}`
          ).childNodes[0].style.backgroundColor = "#ebebeb";

          setHeart(heart - 1);
        }, 500);
      }

      setFirstWord("");
      setSecondWord("");
    }
  }, [firstWord, secondWord, heart, point]);

  useEffect(() => {
    if (heart < 1) {
      setIsModalOpen(true);
    }
  }, [heart]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header heart={heart} point={point} />
      <Watermark content="Synonyms">
        <div style={{ minHeight: "100vh" }} className="p-4" ref={sysRef}>
          {listShuff?.length ? (
            <List
              grid={{
                gutter: 16,
                xs: 3,
                sm: 4,
                md: 5,
                lg: 6,
                xl: 7,
                xxl: 8,
              }}
              dataSource={listShuff}
              renderItem={(item) => (
                <List.Item className="synonyms-content-item">
                  <Card
                    onClick={() => handleCheck(item)}
                    className={`synonyms-card-${item
                      ?.replaceAll(" ", "")
                      ?.replaceAll("/", "")
                      ?.replaceAll(",", "")}`}
                  >
                    {item}
                  </Card>
                </List.Item>
              )}
            />
          ) : (
            ""
          )}
        </div>

        <Modal
          title="You Lose"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <div className="flex flex-col justify-center items-center">
            <div className="mb-8 flex items-center">
              Your score:{" "}
              <span className="text-blue-600 ml-2 text-xl font-semibold">
                {point * 100}
              </span>
            </div>

            <div>
              <button
                type="button"
                onClick={() => location.reload()}
                className="text-white bg-blue-700 w-32 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Play again
              </button>
            </div>
          </div>
        </Modal>
      </Watermark>
    </>
  );
};

export default Synonyms;
