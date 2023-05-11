import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { getScoreBoard, selectScoreBoard } from '../../store/scores';

const ScoreBoard = () => {
  const dispatch = useDispatch<any>();
  const scores = useSelector(selectScoreBoard);

  React.useEffect(() => {
    dispatch(getScoreBoard());
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Rank</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scores?.map((row, idx) => (
            <TableRow key={row.username} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="right">{idx + 1}</TableCell>

              <TableCell component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell align="right">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ScoreBoard;
