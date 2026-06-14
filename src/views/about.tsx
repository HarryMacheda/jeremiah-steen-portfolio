import { Box, Link as MuiLink, Typography } from '@mui/material';

function About() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          boxSizing: 'border-box',
          width: '100%',
          maxWidth: '1900px',
          padding: { xs: '0px 15px', md: '0px 150px' },
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
            gap: 6,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="body1">
              I’m a graphic designer who specialises in publication, branding, and photography. My design focus
              is on inclusivity and accessibility by focusing my work through the lens of research into colour
              visibility and typographic systems through a humanist approach.
            </Typography>
            <Typography variant="body1">
              Jeremiah’s work is typographically and photographically focused. I believe that language is the strongest
              tool we have as designers, not just as a way to communicate ideas and information, but to communicate tone
              and personality through expression. Letters are so much more than written text; they’re living, breathing
              forms of communication.
            </Typography>
            <Typography variant="body1">
              A photograph is an incredible tool that encapsulates the way someone is feeling in the moment and can push
              those emotions towards others, creating work that feels dynamic and alive. My approach to portrait
              photography challenges the traditional boundaries of commercial photography by engaging in work that exists
              outside the status quo through surrealism.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="body1">
              Have a project in mind?
              <br />
              Reach out through email or socials to get in touch.
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong>{' '}
              <MuiLink href="mailto:jsteendesign@gmail.com" underline="hover" color="inherit">
                jsteendesign@gmail.com
              </MuiLink>
            </Typography>
            <Typography variant="body1" sx={{color: 'inherit'}}>
              <strong>Instagram:</strong>{' '}
              <MuiLink
                href="https://www.instagram.com/jsteen_designs/"
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                color="inherit"
              >
                @jsteen_designs
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default About;
