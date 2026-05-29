import * as React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  MenuItem,
} from '@mui/material';
import Grid2 from '@mui/material/Grid2';

export const IssueSubmissionSection: React.FC = () => {
  const [description, setDescription] = React.useState('');
  const [severity, setSeverity] = React.useState('');
  const [reproduction, setReproduction] = React.useState('');
  const [expected, setExpected] = React.useState('');
  const [logs, setLogs] = React.useState('');
  const [screenshotsSelected, setScreenshotsSelected] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!description.trim() || !severity || !reproduction.trim()) {
      setError('Please complete the required fields before submitting.');
      return;
    }

    const title = `[Bug]: ${description.trim().slice(0, 80)}`;
    const body = [
      '## Bug Report',
      `**Description:** ${description.trim()}`,
      `**Severity:** ${severity}`,
      `**Steps to Reproduce:** ${reproduction.trim()}`,
      `**Expected Behavior:** ${expected.trim() || '_Not provided._'}`,
      `**Relevant Logs:** ${logs.trim() || '_Not provided._'}`,
      screenshotsSelected
        ? '_Screenshots were selected in the form. Attach them manually after GitHub opens._'
        : '_No screenshots provided._',
      '',
      '*Submitted from the website.*',
    ].join('\n\n');

    const issueUrl = `https://github.com/bradleyrgriffin/bradleyrgriffin.github.io/issues/new?template=bug-report&title=${encodeURIComponent(
      title,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = issueUrl;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScreenshotsSelected(Boolean(event.target.files && event.target.files.length > 0));
  };

  return (
    <Paper
      id="bug-report-section"
      sx={{ p: 4, mt: 4, borderRadius: 2, backgroundColor: 'secondary.main' }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Submit a Bug Report
      </Typography>
      <Typography variant="body1" mb={3}>
        Fill out the form below and you will be redirected to GitHub to complete the issue.
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid2 container spacing={3}>
          <Grid2 xs={12}>
            <TextField
              label="Describe the Bug"
              multiline
              minRows={3}
              fullWidth
              required
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <TextField
              select
              label="Severity"
              fullWidth
              required
              value={severity}
              onChange={(event) => setSeverity(event.target.value)}
            >
              <MenuItem value="Critical">Critical</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </TextField>
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <TextField
              label="Relevant Logs"
              multiline
              minRows={3}
              fullWidth
              value={logs}
              onChange={(event) => setLogs(event.target.value)}
            />
          </Grid2>

          <Grid2 xs={12}>
            <TextField
              label="Steps to Reproduce"
              multiline
              minRows={4}
              fullWidth
              required
              value={reproduction}
              onChange={(event) => setReproduction(event.target.value)}
            />
          </Grid2>

          <Grid2 xs={12}>
            <TextField
              label="Expected Behavior"
              multiline
              minRows={3}
              fullWidth
              value={expected}
              onChange={(event) => setExpected(event.target.value)}
            />
          </Grid2>

          <Grid2 xs={12}>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="body2">Screenshots</Typography>
              <input
                type="file"
                id="screenshots"
                multiple
                onChange={handleFileChange}
                accept="image/*"
                style={{ width: '100%' }}
              />
              <Typography variant="caption" color="textSecondary">
                Screenshots cannot be attached automatically from this form. If you select files here, you will be prompted to attach them manually after GitHub opens.
              </Typography>
            </Box>
          </Grid2>

          {error ? (
            <Grid2 xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid2>
          ) : null}

          <Grid2 xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit Bug Report
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </Paper>
  );
};
