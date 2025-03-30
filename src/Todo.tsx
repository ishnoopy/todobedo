import {
	Input,
	Flex,
	Text,
	Box,
	VStack,
	Checkbox,
	IconButton,
	Heading,
} from "@chakra-ui/react";
import { LuTrash2, LuPlus } from "react-icons/lu";
import{ useState } from "react";
import { useColorModeValue } from "@/components/ui/color-mode";
export interface Todo {
	id: number;
	text: string;
  completed: boolean;
  timeCompleted: Date | null;
}

export default function Todo() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [newTodo, setNewTodo] = useState("");

	// Color mode values for light/dark theme
	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.600");

	const handleAddTodo = () => {
		if (newTodo.trim() === "") return; // Prevent empty todos
		setTodos([...todos, { id: Date.now(), text: newTodo, completed: false, timeCompleted: null }]);
		setNewTodo("");
	};

	const handleToggleTodo = (id: number) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed, timeCompleted: !todo.completed ? new Date() : null } : todo
			)
		);
	};

	const handleDeleteTodo = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	return (
		<Box p={8} maxWidth="600px" margin="auto">
			<VStack
				style={{
					gap: "20px",
				}}
				align="stretch"
			>
				<Heading size="lg" textAlign="center" mb={6}>
					What should I do?
				</Heading>

				{/* Add Todo Form */}
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleAddTodo();
					}}
				>
					<Flex gap={2}>
						<Input
							placeholder="What needs to be done?"
							size="lg"
							value={newTodo}
							onChange={(e) => setNewTodo(e.target.value)}
							borderRadius="md"
							_focus={{
								boxShadow: "outline",
								borderColor: "blue.500",
							}}
						/>
						<IconButton
							type="submit"
							aria-label="Add todo"
							variant="outline"
							colorScheme="blue"
							size="lg"
							disabled={!newTodo.trim()}
						>
							<LuPlus />
						</IconButton>
					</Flex>
				</form>

				{/* Todo List */}
				<VStack
					style={{
						gap: "10px",
					}}
					align="stretch"
				>
					{todos.map((todo: Todo) => (
						<Box
							key={todo.id}
							p={4}
							borderWidth="1px"
							borderRadius="lg"
							borderColor={borderColor}
							bg={bgColor}
							boxShadow="sm"
							transition="all 0.2s"
							_hover={{
								boxShadow: "md",
								transform: "translateY(-2px)",
							}}
						>
							<Flex justify="space-between" align="center">
								<Flex align="center" gap={3}>
									<Checkbox.Root
										checked={todo.completed}
										onCheckedChange={() => handleToggleTodo(todo.id)}
									>
										<Checkbox.HiddenInput />
										<Checkbox.Control>
											<Checkbox.Indicator />
										</Checkbox.Control>
									</Checkbox.Root>
									<Text
										fontSize="lg"
										textDecoration={todo.completed ? "line-through" : "none"}
										color={todo.completed ? "gray.500" : "inherit"}
									>
										{todo.text}
                  </Text>
                  {todo.timeCompleted && (
                    <Text fontSize="xs" color="gray.500">
                      Completed at {new Date(todo.timeCompleted).toLocaleString()}
                    </Text>
                  )}
								</Flex>
								<IconButton
									aria-label="Delete todo"
									variant="ghost"
									colorScheme="red"
									size="sm"
									onClick={() => handleDeleteTodo(todo.id)}
								>
									<LuTrash2 />
								</IconButton>
							</Flex>
						</Box>
					))}
				</VStack>

				{/* Empty state */}
				{todos.length === 0 && (
					<Text color="gray.500" textAlign="center" py={8}>
						No todos yet. Add some tasks to get started!
					</Text>
				)}
			</VStack>
		</Box>
	);
}
