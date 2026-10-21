import { Route, Switch } from "wouter";
import Index from "./pages/index";
import WorkPage from "./pages/work";
import ProjectPage from "./pages/project";
import ServicesPage from "./pages/services";
import PhilosophyPage from "./pages/philosophy";
import AboutPage from "./pages/about";
import ClientsPage from "./pages/clients";
import ContactPage from "./pages/contact";
import { Layout } from "./components/layout";
import { Provider } from "./components/provider";
import { AgentFeedback } from "@runablehq/website-runtime";

function App() {
  return (
    <Provider>
      <Layout>
        <Switch>
          <Route path="/" component={Index} />
          <Route path="/work" component={WorkPage} />
          <Route path="/work/:slug" component={ProjectPage} />
          <Route path="/services" component={ServicesPage} />
          <Route path="/philosophy" component={PhilosophyPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/clients" component={ClientsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route component={Index} />
        </Switch>
      </Layout>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
    </Provider>
  );
}

export default App;
