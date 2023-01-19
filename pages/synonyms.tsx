import React, { useEffect, useRef, useState } from "react";
import { Card, List, Watermark } from "antd";
import { listE1, listE2 } from "../constant/constant";
import Header from "./container/Header";

const Synonyms = () => {
  const [listShuff, setListShuff] = useState<string[]>([]);
  const [firstWord, setFirstWord] = useState("");
  const [secondWord, setSecondWord] = useState("");

  const [point, setPoint] = useState(0);
  const [heart, setHeart] = useState(3)

  const sysRef = useRef<any>();

  const shuffledArr = (array: string[]) =>
    array.sort(() => 0.5 - Math.random());

  useEffect(() => {
    const listShuffed = shuffledArr([...listE1, ...listE2]);
    setListShuff(listShuffed);
  }, []);

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

          
          setPoint(point + 1)
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

          setHeart(heart - 1)
        }, 500);
      }

      setFirstWord("");
      setSecondWord("");
    }
  }, [firstWord, secondWord, heart, point]);

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
      </Watermark>
    </>
  );
};

export default Synonyms;
