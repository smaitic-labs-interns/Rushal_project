import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import image1 from '../image/image1.png'




export default function Products({products}) {
  const navigate = useNavigate()
  

  return (
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    onClick={()=> navigate(`/product/${product._id}`)}
                    sx={{
                      // 16:9
                      pt: '56.25%',
                      cursor: 'pointer'
                    }}
                    image={image1}
                    alt="random"
                  />
                  {/* <img src={image1} />  */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.name}
                    </Typography>
                    <Typography>
                     
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Typography textAlign='left' variant='h6'>Rs.{product.price}</Typography>
                    <Typography textAlign='right' variant='h6'>{product.category}</Typography>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
  );
}