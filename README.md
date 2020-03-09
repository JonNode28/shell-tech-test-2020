# shell-tech-test-2020

## Usage
Run ```npm run build``` to build and ```npm run start``` to run.

Unit tests can be run with ```npm run test```

## Assumptions
* Captain, Vessel and Port names are unique
* No persistence is required
* No queries against ports and vessels are required

## GraphQL Queries
Use these queries to test the API:

```graphql
query GetCaptainsByName {
  captains(captainName: "James Holden") {
    name
  }
}

query GetCaptains {
  captains {
    name
    arrivalLogs {
      port {
        name
      }
      vessel {
        name
      }
      timestamp
    }
  }
}

mutation LogVisit1{
  logVisit(
    captainName: "James Holden"
    vesselName: "Rocinante"
    portName: "Mars"){
    captain {
      name
    }
    vessel {
      name
    }
    port {
      name
    }
  }
}

mutation LogVisit2{
  logVisit(
    captainName: "James Holden"
    vesselName: "Rocinante"
    portName: "Eros"){
    captain {
      name
    }
    vessel {
      name
    }
    port {
      name
    }
  }
}

mutation LogVisit3{
  logVisit(
    captainName: "Jean-luc Piccard"
    vesselName: "Enterprise"
    portName: "Earth"){
    captain {
      name
    }
    vessel {
      name
    }
    port {
      name
    }
  }
}

mutation LogVisit4{
  logVisit(
    captainName: "Jean-luc Piccard"
    vesselName: "Enterprise"
    portName: "DS9"){
    captain {
      name
    }
    vessel {
      name
    }
    port {
      name
    }
  }
}
```