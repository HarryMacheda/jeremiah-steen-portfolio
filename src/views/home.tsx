import projects from '../data/projects.json';
import { type Project } from '../data/projects';
import { Box, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
        }}
    >
        <title>Jeremiah Steen — Portfolio</title>
        <Box
            sx={{
                boxSizing: 'border-box',
                width: '100%',
                maxWidth: '1900px',
                padding: '0px 125px',
            }}
        >
        <Grid container rowSpacing={3} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
            {projects.map((project: Project) => {
            return (
                <Grid size={6}>
                    <ProjectCard key={project.id} project={project} />
                </Grid>
            );
            })}
        </Grid>
        </Box>
    </Box>
  );
}

function ProjectCard({ project }: { project: Project }) {
    const heroUrl = `${import.meta.env.BASE_URL}${project.assetPath.replace(/^\//, '')}/${project.hero}`;
    const details = project.services.join(' | ');

    return (
        <Link 
            to={`/projects/${project.id}`}
            style={{
                textDecoration: 'none',
                color: 'inherit',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    backgroundImage: `url(${heroUrl})`,
                    aspectRatio: 900 / 600,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '8px',
                }}
                aria-hidden="true"
            />
            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: '8px',
                    marginTop: '12px',
                }}
            >
                <Typography sx={{maxWidth: '50%'}} variant="h2">{project.title}.</Typography>
                <Typography variant="body2">{details}</Typography>
            </Box>
        </Link>
    );
}


export default Home;
