// components/ExperienceAndSkills.tsx
import * as React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import Code from '@mui/icons-material/Code';

import {
  BarChart, // For Modernization Projects
  Cloud, // For Cloud-related skills like AWS, Azure
  DeviceHub, // For DevOps
  FolderSpecialSharp, // For Storage-related skills like RDBMS, NoSQL
  GitHub, // For GitHub Actions
  LibraryBooks, // For Mentoring
  People, // For Technical Leadership
  PlayArrow, // For Agile
  FastForward, // For Spring Boot
  TableChart, // For RDBMS, NoSQL
  Build, // For Docker
  Work, // For Professional Experience
} from '@mui/icons-material';

const skills = [
  {
    name: 'JavaScript',
    description: 'Experienced in developing web applications using JavaScript.',
    icon: <Code />,
  },
  {
    name: 'React',
    description: 'Skilled in building responsive UIs with React.',
    icon: <Work />,
  },
  {
    name: 'Next.js',
    description:
      'Proficient in server-side rendering and static site generation with Next.js.',
    icon: <FastForward />,
  },
  {
    name: 'Material-UI',
    description: 'Expert in designing interfaces with Material-UI.',
    icon: <Work />,
  },
  {
    name: 'Docker',
    description: 'Experienced in containerizing applications using Docker.',
    icon: <Build />,
  },
  {
    name: 'Azure',
    description: 'Proficient in cloud services and solutions with Azure.',
    icon: <Cloud />,
  },
  {
    name: 'AWS',
    description: 'Skilled in cloud services and solutions with AWS.',
    icon: <Cloud />,
  },
  {
    name: 'GitHub Actions',
    description: 'Experienced in automating workflows with GitHub Actions.',
    icon: <GitHub />,
  },
  {
    name: 'CI/CD',
    description: 'Proficient in implementing CI/CD pipelines.',
    icon: <Code />,
  },
  {
    name: 'DevOps',
    description: 'Skilled in DevOps practices and tools.',
    icon: <DeviceHub />,
  },
  {
    name: 'Agile',
    description: 'Experienced in Agile methodologies.',
    icon: <PlayArrow />,
  },
  {
    name: 'Spring Boot',
    description: 'Proficient in developing applications with Spring Boot.',
    icon: <FastForward />,
  },
  {
    name: 'GraphQL',
    description: 'Experienced in designing and querying APIs with GraphQL.',
    icon: <Code />,
  },
  {
    name: 'Elasticsearch',
    description: 'Proficient in using Elasticsearch for search and analytics.',
    icon: <TableChart />,
  },
  {
    name: 'RDBMS',
    description: 'Skilled in working with relational databases (RDBMS).',
    icon: <FolderSpecialSharp />,
  },
  {
    name: 'NoSQL',
    description: 'Experienced in working with NoSQL databases.',
    icon: <FolderSpecialSharp />,
  },
  {
    name: 'OAuth2 & OIDC',
    description:
      'Proficient in implementing OAuth2 and OIDC for authentication.',
    icon: <Code />,
  },
  {
    name: 'Modernization Projects',
    description: 'Experienced in leading and executing modernization projects.',
    icon: <BarChart />,
  },
  {
    name: 'Technical Leadership',
    description: 'Skilled in providing technical leadership and guidance.',
    icon: <People />,
  },
  {
    name: 'Mentoring',
    description: 'Experienced in mentoring and developing team members.',
    icon: <LibraryBooks />,
  },
];

export const ExperienceSkillsSection: React.FC = () => {
  return (
    <Grid2
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      py={4}
    >
      <Grid2
        container
        justifyContent="center"
        alignItems="center"
        spacing={1}
        pb={2}
      >
        <Code color="primary" fontSize="large" />
        <Typography variant="h4" component="h1">
          Skills
        </Typography>
      </Grid2>
      <Grid2 container spacing={4} justifyContent="center">
        {skills.map((skill, index) => (
          <Grid2
            key={index}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
            }}
          >
            <Card>
              <CardContent>
                <Grid2
                  container
                  alignItems="center"
                  justifyContent="flex-start"
                  spacing={2}
                >
                  <Grid2 size={2}>{skill.icon}</Grid2>
                  <Grid2
                    size={10}
                    container
                    justifyContent="flex-start"
                    direction="column"
                  >
                    <Typography variant="h5" component="div">
                      {skill.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {skill.description}
                    </Typography>
                  </Grid2>
                </Grid2>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  );
};
