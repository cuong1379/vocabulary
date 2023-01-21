/* eslint-disable @next/next/no-img-element */
import { Card, Input } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { Meta } = Card;
  const [height, setHeight] = useState(0);
  const router = useRouter();

  const [isHaveName, setIsHaveName] = useState(false);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    const loginedName = localStorage.getItem("playerName");
    if (loginedName) setIsHaveName(true);
  }, []);

  return (
    <div>
      <Head>
        <title>Vocabulary</title>
        <meta name="Vocabulary" content="Vocabulary" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!isHaveName ? (
        <main className="flex flex-col justify-center items-center min-h-screen">
          <div className="form__group field mb-20">
            <input
              type="input"
              className="form__field"
              placeholder="Name"
              name="name"
              id="name"
              required
              value={playerName}
              onChange={(e: any) => setPlayerName(e?.target?.value)}
            />
            <label htmlFor="name" className="form__label">
              Name
            </label>
          </div>

          <button
            className="button-animated"
            onClick={() => {
              localStorage.setItem('playerName', playerName)
              setIsHaveName(true)
            }}
          >
            Let go
          </button>
        </main>
      ) : (
        <main className="py-10 md:py-0">
          <div className="flex flex-col md:flex-row justify-around items-center min-h-screen max-w-5xl mx-auto">
            <div className="mb-10 md:mb-0">
              <Card
                onClick={() => setHeight(height ? 0 : 170)}
                hoverable
                style={{ width: 320 }}
                cover={
                  <img
                    alt="synonyms"
                    src="https://pasal.edu.vn/upload_images/images/2022/100-cap-tu-dong-nghia-tieng-anh-pasal.png"
                  />
                }
              >
                <Meta
                  title="Synonyms"
                  description="Bạn sẽ chọn 2 thẻ từ đồng nghĩa với nhau sau đó chọn nghĩa cho chúng"
                />

                <div
                  className="h-0 duration-300 transfrom overflow-y-hidden"
                  style={{ width: "100%", height: height }}
                >
                  <hr className="mt-4" />
                  <div
                    className="py-2 px-2 mt-2 rounded cursor-pointer text-lg font-medium text-green-500 hover:bg-gray-100"
                    onClick={() => router?.push("/synonyms?level=1")}
                  >
                    Level 1: 10 cặp
                  </div>
                  <div
                    className="py-2 px-2 rounded cursor-pointer text-lg font-medium text-blue-500 hover:bg-gray-100"
                    onClick={() => router?.push("/synonyms?level=2")}
                  >
                    Level 2: 20 cặp
                  </div>
                  <div
                    className="py-2 px-2 rounded cursor-pointer text-lg font-medium text-red-500 hover:bg-gray-100"
                    onClick={() => router?.push("/synonyms?level=3")}
                  >
                    Level 3: 30 cặp
                  </div>
                </div>
              </Card>
            </div>
            <div>
              <Card
                hoverable
                style={{ width: 320 }}
                cover={
                  <img
                    alt="polysemy"
                    src="https://www.dictionary.com/e/wp-content/uploads/2019/03/20190409_polysemy1.jpg"
                  />
                }
              >
                <Meta
                  title="Polysemy"
                  description="Bạn sẽ chọn 2 thẻ từ đồng nghĩa với nhau sau đó chọn nghĩa cho chúng"
                />
              </Card>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Home;
