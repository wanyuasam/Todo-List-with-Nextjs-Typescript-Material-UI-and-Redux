
import TodoList from "@/components/Todolist";
import { Button, List, Typography, Box } from "@mui/material";
import Link from "next/link";

const Home = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Todos</Typography>
        <Button variant="outlined" component={Link} href="/new">
          New
        </Button>
      </Box>
      <TodoList />
    </Box>
  );
};

export default Home;
