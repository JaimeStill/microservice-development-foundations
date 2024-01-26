# Overview

The following workshop will focus on taking a very simple data model, and walking through each stage of the development platform. The intent is not for you to memorize all of the specific details that are shown or discussed, but to establish an initial acquaintance. This way a degree of familiarity exists when looking at a concept from a more complex perspective.

## Setup

### Create the base directory structure

``` pwsh
mkdir overview
cd overview
mkdir app
mkdir node
```

### Initialize the dotnet infrastructure

```pwsh
cd node
dotnet new sln -n Overview
dotnet new classlib -o Overview.Models
dotnet new console -o Overview.Data
dotnet new classlib -o Overview.Services
dotnet new webapi -o Overview.Api
```

### Create solution references

This aggregates all of the projects into a single solution that simplifies management.

```pwsh
dotnet sln add Overview.Models
dotnet sln add Overview.Data
dotnet sln add Overview.Services
dotnet sln add Overview.Api
```

Open [`Overview.sln`](./overview/node/Overview.sln) to see the effect of these commands.

### Create project references

It's important to note that references only work in one direction. You cannot reference a project that references that same project, or try to create the reference indirectly through another project reference. This is called a circular dependency. Layer your dependencies from the bottom up.

```pwsh
cd Overview.Data
dotnet add reference ..\Overview.Models

cd ..\Overview.Services
dotnet add reference ..\Overview.Models
dotnet add reference ..\Overview.Data

cd ..\Overview.Api
dotnet add reference ..\Overview.Models
dotnet add reference ..\Overview.Data
dotnet add reference ..\Overview.Services
```

### Add project dependencies

Third-party libraries, or external dependencies, are managed by a package manager called NuGet.

```pwsh
cd ..\Overview.Data
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools

cd ..\Overview.Services
dotnet add package Microsoft.EntityFrameworkCore.SqlServer

cd ..\Overview.Api
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```