import React, { Component } from 'react';
import { Typography, Card, CardContent } from '@mui/material';

class DayCard extends Component {
  render() {
    const { day } = this.props;

    return (
      <Card variant="outlined" style={{ marginBottom: 8 }}>
        <CardContent>
          <Typography variant="h6">{day.title}</Typography>
          <Typography>{day.description}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default DayCard;
