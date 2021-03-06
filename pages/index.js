import React, { useEffect, useState } from "react";
import css from "@emotion/css";
import styled from "styled-components";
import { Input, Card, Col, Row, Skeleton, Avatar } from "antd";
import axios from "axios";
import Particles from "react-particles-js";
import "antd/dist/antd.css";

import "./style.css";

const { Search } = Input;

const { Meta } = Card;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: #0e0e0e; */
  background-image: linear-gradient(#2b2b2b, #242424, #171717);
  color: #ffffff;
  padding-bottom: 4rem;
  min-height: 100vh;
`;

const Title = styled.div`
  margin: 0 1rem;
  margin-bottom: 4rem;
  font-size: 3rem;
  text-align: center;
`;

const CardContainer = styled(Row)`
  margin-top: 4rem !important;
  max-width: 1440px;
`;

const MovieCard = styled(Card)`
  width: 260px;
  height: 440px;
`;

const MovieImage = styled.div`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: ${({ url }) => `url('${url}')`};
  height: 100%;
`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const skeletonList = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  useEffect(() => {
    axios.get(`http://nangchana.joetokens.com/api/movie`).then(({ data: { movies } }) => {
      setMovies(movies);
      setLoading(false);
    });
  }, []);

  const handleSearch = async (search) => {
    setLoading(true);
    axios
      .get(`http://nangchana.joetokens.com/api/movie/text?query=${search}`)
      .then(({ data: { movies } }) => {
        console.log("movies", movies);
        setMovies(movies);
        setLoading(false);
      });
  };

  return (
    <Container>
      <Particles
        css={css`
          position: absolute;
          width: 100%;
          height: 100%;
        `}
        params={{
          particles: {
            number: {
              value: 60,
            },
            size: {
              value: 3,
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
            },
          },
        }}
      />
      <img
        src="/logo.png"
        css={css`
          width: 10rem;
          margin-top: 4rem;
          margin-bottom: 1.5rem;
          z-index: 0;
        `}
      />
      <Title>กรุณากรอกคำถามด้านล่างเพื่อทายชื่อหนัง</Title>
      <Search
        placeholder="กรุณากรอกคำถาม..."
        enterButton
        css={css`
          width: 600px;
          @media (min-width: 540px) and (max-width: 700px) {
            width: 400px;
          }
          @media (max-width: 540px) {
            width: 320px;
          }
        `}
        onSearch={handleSearch}
      />
      <CardContainer gutter={[0, 24]}>
        {!loading ? (
          movies ? (
            movies.map((movie, i) => (
              <Col
                key={i}
                span={8}
                css={css`
                  display: flex;
                  justify-content: center;
                `}
                xs={24}
                md={12}
                lg={8}
              >
                <MovieCard title={movie.name} bordered={false}>
                  {movie.imageUrl ? (
                    <MovieImage url={movie.imageUrl} />
                  ) : (
                    <div
                      css={css`
                        display: flex;
                        justify-content: center;
                      `}
                    >
                      Picture
                    </div>
                  )}
                </MovieCard>
              </Col>
            ))
          ) : (
            <div
              css={css`
                font-size: 1.25rem;
              `}
            >
              ไม่พบหนังที่คุณค้นหา
            </div>
          )
        ) : (
          skeletonList.map((item, i) => (
            <Col
              key={i}
              span={8}
              css={css`
                display: flex;
                justify-content: center;
              `}
              xs={24}
              md={12}
              lg={8}
            >
              <MovieCard bordered={false}>
                <Skeleton
                  loading={loading}
                  active
                  css={css`
                    padding: 4rem;
                  `}
                >
                  <Meta title="Card title" description="This is the description" />
                </Skeleton>
              </MovieCard>
            </Col>
          ))
        )}
      </CardContainer>
    </Container>
  );
};

export default App;
