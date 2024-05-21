import { ConnectButton } from "@mysten/dapp-kit";
import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletStatus } from "./WalletStatus";
import CreateCampaign from "./pages/CreateCampaign";
import Campaigns from "./pages/Campaigns";

function App() {
  return (
    <>
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
        }}
      >
        <Box>
          <Heading style={{fontStyle:'italic'}}>AdCampagin</Heading>
        </Box>

        <Box>
          <ConnectButton />
        </Box>
      </Flex>
      <Container>
        <Container
          mt="5"
          pt="2"
          px="4"
          style={{ display:'flex',justifyContent:'center', textAlign: 'center', width:'100%' }}
        >
          <WalletStatus />
           <BrowserRouter>
            <Routes>
                <Route path="/" index element={<Campaigns/>} />
                <Route path="/campaign/create" index element={<CreateCampaign/>} />
            </Routes>
          </BrowserRouter>          
        </Container>
      </Container>
    </>
  );
}

export default App;
