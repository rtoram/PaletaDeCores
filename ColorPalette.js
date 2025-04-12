import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ColorThief from 'colorthief';
import { Box, Paper, Typography, Grid } from '@mui/material';

function ColorPalette() {
  const [palette, setPalette] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = async () => {
      const img = new Image();
      img.src = reader.result;
      setSelectedImage(reader.result);

      img.onload = () => {
        const colorThief = new ColorThief();
        const colorPalette = colorThief.getPalette(img, 5);
        setPalette(colorPalette);
      };
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    }
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Extrator de Paleta de Cores
      </Typography>

      <Paper
        {...getRootProps()}
        sx={{
          p: 2,
          mb: 2,
          cursor: 'pointer',
          textAlign: 'center',
          backgroundColor: '#f5f5f5'
        }}
      >
        <input {...getInputProps()} />
        <Typography>
          Arraste e solte uma imagem aqui, ou clique para selecionar
        </Typography>
      </Paper>

      {selectedImage && (
        <Box sx={{ mb: 2 }}>
          <img
            src={selectedImage}
            alt="Imagem selecionada"
            style={{ maxWidth: '100%', maxHeight: '300px' }}
          />
        </Box>
      )}

      {palette.length > 0 && (
        <Grid container spacing={2}>
          {palette.map((color, index) => (
            <Grid item xs={12} sm={2.4} key={index}>
              <Paper
                sx={{
                  height: 100,
                  backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                }}
              />
              <Typography sx={{ mt: 1 }}>
                RGB({color[0]}, {color[1]}, {color[2]})
              </Typography>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default ColorPalette;
