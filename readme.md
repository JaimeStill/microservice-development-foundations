# Microservice Development Foundations

> This workshop is currently being developed

Centered around a microservice development process that exposes participants to fundamentals, but also shows how those fundamentals come together into a more tangible workflow. This is a workshop-based training program where participants are encouraged to follow along and, at the end of the guided session, try to apply the learned principles in a practical exercise. The course will have a central git repository that contains:

* Guided sessions for the curriculum below
* Practical exercise(s)
* Links to resources to help dig deeper into introduced concepts

See [Tools](./tools.md) for a list of tools, images, and extensions that are needed in order to follow along with this workshop.

## Curriculum

* [**10,000 ft. Overview**](./01-overview/) - Walk through a simple sample that provides a surface level illustration of the capabilities developed throughout the course.
    * [Project Setup](./01-overview/project-setup.md) - Scaffold workshop project infrastructure.
    * [Node Development](./01-overview/node-development.md) - Overview of Node development using a single, simple data model.
    * [App Development](./01-overview/app-development.md) - Overview of App development using a single, simple data model.

### Node Development

> A *Node* represents the server, or backend, component of a microservice.

* [**Building a Data Model**](./02-building-a-data-model/) - Leveraging C# object models to build a related entity structure.
* [**Connecting the Data Model to SQL**](./03-connecting-the-data-model-to-sql/) - Take the data model that was previously built and use it to generate a SQL database that you can interface with through Entity Framework. Will also touch on building command line utilities.
* [**Building Business Logic with Services**](./04-building-business-logic-with-services/) - Use OOP principles to define a robust business logic service layer to optimize how you retrieve and mutate entity data.
* [**Exposing a REST API**](./05-exposing-a-rest-api/) - Leverage HTTP endpoints to expose service functions through Web API controllers.

### App Development

* [**Initializing Angular**](./06-initializing-angular/) - Initialize a starting point for an Angular web app. Includes setting up dependencies, establishing an initial theme and structure, and illustrates how Angular can be used to develop design concepts.
* [**Building Data Models and Forms**](./07-building-data-models-and-forms/) - Establish data structures aligned with the data model of your node.
* [**Connecting to the API With Services**](./08-connecting-to-the-api-with-services/) - Build out Angular service infrastructure designed to interface with your node.
* [**Building Angular Components and Routes**](./09-building-angular-components-and-routes/) - Build reusable web components for rendering and interacting with data models, and establish a network of interfaces.
* [**Reactive Forms and Dialogs**](./10-reactive-forms-and-dialogs/) - Build interface workflows that allow you to create and modify entity data. Also covers input validation and leveraging browser storage to cache user inputs to prevent accidental data loss.

### Advanced Topics

* [**Synchronizing Data in Real Time**](./11-synchronizing-data-in-real-time/) - Integrate web sockets into the full app platform to ensure that updates on one system are replicated across all connected clients concurrently.
* [**Containerization and Cloud Deployment**](./12-containerization-and-cloud-deployment/) - Encapsulate your server and app into Docker containers, script the creation and configuration of required cloud infrastructure, and deploy the images.
* [**Cross-Node Communication**](./13-cross-node-communication/) - Allow data to be submitted from an origin node to a target node, and allow affected data to be synchronized between them. This scenario is equivalent to two offices within an organization interfacing with each other.