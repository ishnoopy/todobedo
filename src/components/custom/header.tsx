import { ClientOnly, Flex, Text, IconButton, Skeleton } from "@chakra-ui/react"
import { useColorMode} from "@/components/ui/color-mode"
import { LuMoon, LuSun } from "react-icons/lu"
export default function Header() {
  const { toggleColorMode } = useColorMode()
  const { colorMode } = useColorMode()

  return (
    <Flex justifyContent="space-between" alignItems="center" padding="20px">
      <Text fontSize="2xl" fontWeight="bold">TodoBedo</Text>
      
      <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton onClick={toggleColorMode} variant="outline" size="sm">
        {colorMode === "light" ? <LuSun /> : <LuMoon />}
      </IconButton>
    </ClientOnly>
        
    </Flex>
  )
}
