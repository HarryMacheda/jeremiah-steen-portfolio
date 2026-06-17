import { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import projects from '../data/projects.json';
import { type Project } from '../data/projects';
import { Box, Grid, Typography } from '@mui/material';
import GalleryItem from '../components/GalleryItem';

function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();

  const project = useMemo(
    () => projects.find((item: Project) => item.id === slug),
    [slug],
  );

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const bannerUrl = `${import.meta.env.BASE_URL}${project.assetPath.replace(/^\//, '')}/${(project.banner != null && project.banner !== '') ? project.banner : project.hero}`;
  return (
    <>
        <title>{`Jeremiah Steen — ${project.title}`}</title>
        <img 
            src={bannerUrl} 
            alt={project.title} 
            style={{
                width: '100%',
                height: 'auto',
            }}
        />
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
                    padding: '0px 125px',
                }}
            >
                <Box
                    sx={{
                        margin: '64px 0px',
                    }}
                >
                    <Typography sx={{ maxWidth: "80%", fontSize: "30px" }} variant="body1">
                        {project.description}
                    </Typography>
                </Box>

                <Grid container rowSpacing={3} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                    {project.gallery.map((row) => {
                        return row.map((image) => (
                            <GalleryItem
                                key={`${project.assetPath}/${image.src}`}
                                item={image}
                                assetPath={project.assetPath}
                                columnCount={row.length}
                            />
                        ));
                    })}
                </Grid>

                <Grid container rowSpacing={3} columnSpacing={{ xs: 2, sm: 2, md: 2}} sx={{marginTop: '32px'}}>
                    <Grid size={6} sx={{ paddingRight: '96px', display: 'flex', flexDirection: 'column', gap: '24px'}}>
                        {project.brief.length > 0 && (
                            <>
                                <Typography variant="h1">Brief.</Typography>
                                {project.brief.map((item) => (
                                    <Typography variant="body1">{item}</Typography>
                                ))}
                            </>
                        )}
                        <Typography variant="h1">Response.</Typography>
                        {project.response.map((item) => (
                            <Typography variant="body1">{item}</Typography>
                        ))}
                    </Grid>
                    <Grid size={6} sx={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                        {project.services.length > 0 && (
                            <>
                                <Typography variant="h1">Services.</Typography>
                                {project.services.map((service) => (
                                    <Typography variant="body1">{service}</Typography>
                                ))}
                            </>
                        )}
                    </Grid>
                </Grid>            
            </Box>
        </Box>
    </>
  );
}

export default ProjectPage;
