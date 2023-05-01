import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Table } from 'react-bootstrap';
import { useGetTracksQuery, useGetCountQuery, Track } from './generated/graphql';
import Pagination from './components/pagination';
import './App.css'

function App() {

  const [artistName, setArtistName] = useState<string>('')
  const [genreName, setGenreName] = useState<string>('')
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(3)

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10)

  const { loading, error, data } = useGetTracksQuery({
    variables: {
      input: {
        artistName,
        genreName,
        minPrice,
        maxPrice,
        page: page - 1,
        pageSize: perPage
      }
    }
  });

  const { data: totalCount } = useGetCountQuery({
    variables: {
      input: {
        artistName,
        genreName,
        minPrice,
        maxPrice,
        page,
        pageSize: perPage
      }
    }
  });

  useEffect(() => {
    setPage(1)
  }, [artistName, genreName, minPrice, maxPrice])
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const offset = (page - 1) * perPage

  return (
    <div>
      <Container className='mt-5'>
        <Row className='text-center'>
          <Col >
            <h1>Track Search App</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId='artistName'>
              <Form.Label>Artist Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter artist name'
                value={String(artistName)}
                onChange={(e) => setArtistName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='genreName'>
              <Form.Label>Genre Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter genre name'
                value={String(genreName)}
                onChange={(e) => setGenreName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='minPrice'>
              <Form.Label>Min Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter minimum price'
                min={0}
                value={String(minPrice)}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='maxPrice'>
              <Form.Label>Max Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter maximum price'
                min={0}
                value={String(maxPrice)}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='perPage'>
              <Form.Label>Per Page:</Form.Label>
              <Form.Control
                as='select'
                value={String(perPage)}
                onChange={(e) => setPerPage(Number(e.target.value))}
              >
                <option value='10'>10</option>
                <option value='15'>15</option>
                <option value='20'>20</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className='mt-5'>
          <Row>
            {data?.getTracks && data?.getTracks?.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Track ID</th>
                    <th>Track Name</th>
                    <th>Artist Name</th>
                    <th>Genre Name</th>
                    <th>Price</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {data.getTracks.map((track: any, index: number) => (
                    <tr key={track.id}>
                      <td>{offset + index + 1}</td>
                      <td>{track.id}</td>
                      <td>{track.name}</td>
                      <td>{track.artist.name}</td>
                      <td>{track.genre}</td>
                      <td>{track.price}</td>
                      <td>{track.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No results found</p>
            )}
          </Row>
        </Row>

        <Row>
          <Pagination
            page={page}
            totalPages={totalCount?.getCount ?? 1}
            handlePagination={(page) => setPage(page)}
          />
        </Row>
      </Container>
    </div>
  );
}

export default App;
