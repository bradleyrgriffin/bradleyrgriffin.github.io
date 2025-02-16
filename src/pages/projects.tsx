// pages/projects.tsx
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid2,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { fetchRepositories } from '../components/utilities/githubApi';
import { githubUsername } from '../components/constants/contactInformation';
import { NextSeo } from 'next-seo';

const Projects: React.FC = () => {
  const [repositories, setRepositories] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRepositories(githubUsername); // Replace with your GitHub username
      setRepositories(data);
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg">
      <NextSeo
        title="Projects | Brad Griffin, Professsional"
        description="A showcase of my GitHub repositories and projects."
        openGraph={{
          title: 'Projects | Brad Griffin, Professsional',
          description: 'A showcase of my GitHub repositories and projects.',
          url: 'https://bradleyrgriffin.me/projects',
        }}
      />
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Projects
        </Typography>
        <Grid2 container spacing={4} pb={4}>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Genetic Algorithm
                </Typography>
                <Typography variant="subtitle1">
                  This is a in-browser application, clicking Open below will
                  launch it. It showcases how to use a genetic algorithm to
                  solve the knapsack problem.
                </Typography>
                <Button
                  size="small"
                  color="primary"
                  href="projects/geneticAlgorithm.html"
                >
                  Open App
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
        <Typography variant="h4" component="h1" gutterBottom>
          Github Projects
        </Typography>
        <Grid2 container spacing={4}>
          {repositories?.map((repo) => (
            <Grid2 key={repo.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {repo.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {repo.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    href={repo.html_url}
                    target="_blank"
                  >
                    View on GitHub
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Container>
  );
};

export default Projects;
