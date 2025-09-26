const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Fintech Quiz
  await prisma.quiz.create({
    data: {
      title: "Fintech Fundamentals",
      description: "Test your knowledge of financial technology concepts, digital payments, and blockchain",
      questions: {
        create: [
          {
            text: "What does KYC stand for in fintech?",
            options: {
              create: [
                { text: "Know Your Customer", isCorrect: true },
                { text: "Keep Your Coins", isCorrect: false },
                { text: "Key Year Calculation", isCorrect: false },
                { text: "Knowledge Year Cycle", isCorrect: false },
              ],
            },
          },
          {
            text: "Which technology is primarily used for cryptocurrency transactions?",
            options: {
              create: [
                { text: "Machine Learning", isCorrect: false },
                { text: "Blockchain", isCorrect: true },
                { text: "Cloud Computing", isCorrect: false },
                { text: "Virtual Reality", isCorrect: false },
              ],
            },
          },
          {
            text: "What is DeFi?",
            options: {
              create: [
                { text: "Decentralized Finance", isCorrect: true },
                { text: "Digital Finance", isCorrect: false },
                { text: "Deferred Finance", isCorrect: false },
                { text: "Defined Finance", isCorrect: false },
              ],
            },
          },
          {
            text: "Which payment method is considered fastest for international transfers?",
            options: {
              create: [
                { text: "Wire Transfer", isCorrect: false },
                { text: "SWIFT", isCorrect: false },
                { text: "Cryptocurrency", isCorrect: true },
                { text: "Check", isCorrect: false },
              ],
            },
          },
          {
            text: "What does API stand for in fintech context?",
            options: {
              create: [
                { text: "Advanced Payment Interface", isCorrect: false },
                { text: "Application Programming Interface", isCorrect: true },
                { text: "Automated Processing Integration", isCorrect: false },
                { text: "Account Protection Index", isCorrect: false },
              ],
            },
          },
          {
            text: "What is the primary purpose of a digital wallet?",
            options: {
              create: [
                { text: "Store physical cash", isCorrect: false },
                { text: "Store digital payment information", isCorrect: true },
                { text: "Mine cryptocurrencies", isCorrect: false },
                { text: "Track stock prices", isCorrect: false },
              ],
            },
          },
          {
            text: "Which regulation is most relevant to European fintech companies?",
            options: {
              create: [
                { text: "GDPR", isCorrect: false },
                { text: "PSD2", isCorrect: true },
                { text: "HIPAA", isCorrect: false },
                { text: "SOX", isCorrect: false },
              ],
            },
          },
          {
            text: "What is a smart contract?",
            options: {
              create: [
                { text: "A paper contract", isCorrect: false },
                { text: "Self-executing contract with terms in code", isCorrect: true },
                { text: "A contract with AI", isCorrect: false },
                { text: "A mobile app contract", isCorrect: false },
              ],
            },
          },
          {
            text: "What does P2P mean in financial services?",
            options: {
              create: [
                { text: "Point to Point", isCorrect: false },
                { text: "Peer to Peer", isCorrect: true },
                { text: "Pay to Play", isCorrect: false },
                { text: "Price to Performance", isCorrect: false },
              ],
            },
          },
          {
            text: "Which is a key benefit of open banking?",
            options: {
              create: [
                { text: "Reduced security", isCorrect: false },
                { text: "Increased data sharing", isCorrect: true },
                { text: "Higher fees", isCorrect: false },
                { text: "Slower transactions", isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });

  // Software Engineering Concepts Quiz
  await prisma.quiz.create({
    data: {
      title: "Software Engineering Concepts",
      description: "Fundamental software engineering principles, methodologies, and best practices",
      questions: {
        create: [
          {
            text: "What does SDLC stand for?",
            options: {
              create: [
                { text: "Software Development Life Cycle", isCorrect: true },
                { text: "System Design Life Cycle", isCorrect: false },
                { text: "Software Design Life Cycle", isCorrect: false },
                { text: "System Development Life Cycle", isCorrect: false },
              ],
            },
          },
          {
            text: "Which design pattern is used to ensure a class has only one instance?",
            options: {
              create: [
                { text: "Factory", isCorrect: false },
                { text: "Singleton", isCorrect: true },
                { text: "Observer", isCorrect: false },
                { text: "Strategy", isCorrect: false },
              ],
            },
          },
          {
            text: "What is the main principle of Agile methodology?",
            options: {
              create: [
                { text: "Extensive documentation", isCorrect: false },
                { text: "Iterative development", isCorrect: true },
                { text: "Waterfall approach", isCorrect: false },
                { text: "No testing required", isCorrect: false },
              ],
            },
          },
          {
            text: "What does DRY principle stand for?",
            options: {
              create: [
                { text: "Don't Repeat Yourself", isCorrect: true },
                { text: "Do Repeat Yourself", isCorrect: false },
                { text: "Don't Return Yourself", isCorrect: false },
                { text: "Dynamic Resource Yield", isCorrect: false },
              ],
            },
          },
          {
            text: "Which testing approach tests individual components in isolation?",
            options: {
              create: [
                { text: "Integration Testing", isCorrect: false },
                { text: "Unit Testing", isCorrect: true },
                { text: "System Testing", isCorrect: false },
                { text: "Acceptance Testing", isCorrect: false },
              ],
            },
          },
          {
            text: "What is the purpose of version control systems?",
            options: {
              create: [
                { text: "Code compilation", isCorrect: false },
                { text: "Track changes in code", isCorrect: true },
                { text: "Database management", isCorrect: false },
                { text: "User interface design", isCorrect: false },
              ],
            },
          },
          {
            text: "Which SOLID principle states that classes should be open for extension but closed for modification?",
            options: {
              create: [
                { text: "Single Responsibility", isCorrect: false },
                { text: "Open/Closed", isCorrect: true },
                { text: "Liskov Substitution", isCorrect: false },
                { text: "Dependency Inversion", isCorrect: false },
              ],
            },
          },
          {
            text: "What is continuous integration?",
            options: {
              create: [
                { text: "Manual code reviews", isCorrect: false },
                { text: "Automated merging and testing of code changes", isCorrect: true },
                { text: "Manual deployment process", isCorrect: false },
                { text: "Code documentation", isCorrect: false },
              ],
            },
          },
          {
            text: "Which architectural pattern separates application logic from presentation?",
            options: {
              create: [
                { text: "MVC", isCorrect: true },
                { text: "Singleton", isCorrect: false },
                { text: "Factory", isCorrect: false },
                { text: "Observer", isCorrect: false },
              ],
            },
          },
          {
            text: "What is refactoring?",
            options: {
              create: [
                { text: "Adding new features", isCorrect: false },
                { text: "Improving code structure without changing functionality", isCorrect: true },
                { text: "Fixing bugs", isCorrect: false },
                { text: "Writing documentation", isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });

  // Full Stack Development Quiz
  await prisma.quiz.create({
    data: {
      title: "Full Stack Development",
      description: "Frontend, backend, databases, and modern web development technologies",
      questions: {
        create: [
          {
            text: "Which HTTP method is used to update a resource?",
            options: {
              create: [
                { text: "GET", isCorrect: false },
                { text: "POST", isCorrect: false },
                { text: "PUT", isCorrect: true },
                { text: "DELETE", isCorrect: false },
              ],
            },
          },
          {
            text: "What is the primary purpose of middleware in web applications?",
            options: {
              create: [
                { text: "Database management", isCorrect: false },
                { text: "Process requests between client and server", isCorrect: true },
                { text: "User interface rendering", isCorrect: false },
                { text: "CSS compilation", isCorrect: false },
              ],
            },
          },
          {
            text: "Which database type is MongoDB?",
            options: {
              create: [
                { text: "Relational", isCorrect: false },
                { text: "NoSQL Document", isCorrect: true },
                { text: "Graph", isCorrect: false },
                { text: "Key-Value", isCorrect: false },
              ],
            },
          },
          {
            text: "What does CORS stand for?",
            options: {
              create: [
                { text: "Cross-Origin Resource Sharing", isCorrect: true },
                { text: "Cross-Origin Request Security", isCorrect: false },
                { text: "Client-Origin Resource Security", isCorrect: false },
                { text: "Cross-Object Resource System", isCorrect: false },
              ],
            },
          },
          {
            text: "Which React hook is used for side effects?",
            options: {
              create: [
                { text: "useState", isCorrect: false },
                { text: "useEffect", isCorrect: true },
                { text: "useContext", isCorrect: false },
                { text: "useReducer", isCorrect: false },
              ],
            },
          },
          {
            text: "What is the purpose of JWT tokens?",
            options: {
              create: [
                { text: "Database queries", isCorrect: false },
                { text: "User authentication and authorization", isCorrect: true },
                { text: "CSS styling", isCorrect: false },
                { text: "Image compression", isCorrect: false },
              ],
            },
          },
          {
            text: "Which CSS methodology promotes component-based styling?",
            options: {
              create: [
                { text: "BEM", isCorrect: true },
                { text: "SASS", isCorrect: false },
                { text: "LESS", isCorrect: false },
                { text: "PostCSS", isCorrect: false },
              ],
            },
          },
          {
            text: "What is the main advantage of using a CDN?",
            options: {
              create: [
                { text: "Improved loading speed", isCorrect: true },
                { text: "Better security", isCorrect: false },
                { text: "Easier development", isCorrect: false },
                { text: "Lower costs", isCorrect: false },
              ],
            },
          },
          {
            text: "Which tool is commonly used for API testing?",
            options: {
              create: [
                { text: "Photoshop", isCorrect: false },
                { text: "Postman", isCorrect: true },
                { text: "Figma", isCorrect: false },
                { text: "Slack", isCorrect: false },
              ],
            },
          },
          {
            text: "What does SSR stand for in web development?",
            options: {
              create: [
                { text: "Server-Side Rendering", isCorrect: true },
                { text: "Single Sign-on Request", isCorrect: false },
                { text: "Secure Socket Request", isCorrect: false },
                { text: "Static Site Repository", isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });

  // System Design Quiz
  await prisma.quiz.create({
    data: {
      title: "System Design Fundamentals",
      description: "Scalability, architecture patterns, and distributed system concepts",
      questions: {
        create: [
          {
            text: "What is horizontal scaling?",
            options: {
              create: [
                { text: "Adding more power to existing machines", isCorrect: false },
                { text: "Adding more machines to the resource pool", isCorrect: true },
                { text: "Reducing system complexity", isCorrect: false },
                { text: "Optimizing database queries", isCorrect: false },
              ],
            },
          },
          {
            text: "Which pattern is used to improve system performance by storing frequently accessed data?",
            options: {
              create: [
                { text: "Load Balancing", isCorrect: false },
                { text: "Caching", isCorrect: true },
                { text: "Sharding", isCorrect: false },
                { text: "Replication", isCorrect: false },
              ],
            },
          },
          {
            text: "What is the CAP theorem?",
            options: {
              create: [
                { text: "Consistency, Availability, Partition tolerance", isCorrect: true },
                { text: "Cache, API, Performance", isCorrect: false },
                { text: "Client, Application, Platform", isCorrect: false },
                { text: "Capacity, Availability, Processing", isCorrect: false },
              ],
            },
          },
          {
            text: "Which component distributes incoming requests across multiple servers?",
            options: {
              create: [
                { text: "Database", isCorrect: false },
                { text: "Load Balancer", isCorrect: true },
                { text: "Cache", isCorrect: false },
                { text: "Message Queue", isCorrect: false },
              ],
            },
          },
          {
            text: "What is database sharding?",
            options: {
              create: [
                { text: "Creating database backups", isCorrect: false },
                { text: "Partitioning data across multiple databases", isCorrect: true },
                { text: "Encrypting database content", isCorrect: false },
                { text: "Optimizing database indexes", isCorrect: false },
              ],
            },
          },
          {
            text: "Which architectural pattern decouples components using events?",
            options: {
              create: [
                { text: "Event-Driven Architecture", isCorrect: true },
                { text: "Monolithic Architecture", isCorrect: false },
                { text: "Layered Architecture", isCorrect: false },
                { text: "Client-Server Architecture", isCorrect: false },
              ],
            },
          },
          {
            text: "What is the primary benefit of microservices architecture?",
            options: {
              create: [
                { text: "Easier debugging", isCorrect: false },
                { text: "Independent deployment and scaling", isCorrect: true },
                { text: "Lower development costs", isCorrect: false },
                { text: "Simpler testing", isCorrect: false },
              ],
            },
          },
          {
            text: "Which consistency model provides the strongest guarantees?",
            options: {
              create: [
                { text: "Eventual Consistency", isCorrect: false },
                { text: "Strong Consistency", isCorrect: true },
                { text: "Weak Consistency", isCorrect: false },
                { text: "Causal Consistency", isCorrect: false },
              ],
            },
          },
          {
            text: "What is the purpose of a message queue in distributed systems?",
            options: {
              create: [
                { text: "Store user sessions", isCorrect: false },
                { text: "Enable asynchronous communication", isCorrect: true },
                { text: "Cache database queries", isCorrect: false },
                { text: "Balance network traffic", isCorrect: false },
              ],
            },
          },
          {
            text: "Which metric measures system's ability to handle increased load?",
            options: {
              create: [
                { text: "Latency", isCorrect: false },
                { text: "Scalability", isCorrect: true },
                { text: "Reliability", isCorrect: false },
                { text: "Availability", isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });
}

main()
  .then(() => console.log("Seed complete"))
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
