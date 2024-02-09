# App Development

The following sections will provide a very simplified, high-level walkthrough of building an Angular app that interfaces with a SQL-backed REST API.

## App Project Overview

Before digging into making adjustments, it's important to look at the structure of the app project to understand how it is setup.

> There is no need to memorize all of this. This is just to familiarize you with the project layout and give you an understanding of where things are defined and what they are for.

* **overview/app** - app project root
    * **src** - app project source files.
        * **app** - contains the Angular project source code.
            * **core** - a space for defining core services, utility classes, models, or any other useful features that are fundamental to the application.
                * **services** - contains fundamental app services.
                    * `snacker.service.ts` - a service that allows you to render Snackbar messages.
                    * `theme.service.ts` - a service that controls the light and dark mode theming.
            * **flex** - infrastructure that enables dynamically styling elements with [CSS Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) using [Angular directives](https://angular.dev/guide/directives/directive-composition-api).
            * **routes** - defines Angular route components.
            * `app.component.html` - the root Angular app component template file.
            * `app.component.scss` - the root Angular app component style file.
            * `app.component.ts` - the root Angular app component logic file.
            * `app.config.ts` - defines Angular [application configuration](https://angular.dev/reference/configs/file-structure#application-source-files) that tells Angular how to assemble the application.
            * `app.routes.ts` - defines the application's routing configuration.
        * **assets** - contains static assets to be copied as-is when building the project, and can be accessed by URL from the root of the app URL. For instance, *https://<app-url>/assets/images/logo.svg* would load the file located at *assets/images/logo.svg*.
        * **environments** - provides environment-specific configuration data inside of a TypeScript object. [*angular.json*](./overview/app/angular.json#L57) configuration provides the option to overwrite *environment.ts* with a different value based on the environment being built.
            * `environment.ts` - default configuration
            * `environment.prod.ts` - configuration to use when using the **production** configuration.
        * **theme** - provides global SCSS theming setup.
            * `color.scss` - defines color-specific styling based on the values in *palette.scss*.
            * `glow.scss` - defines colorful drop-shadow styling with elevation-based hovering animations. Also based on color values in *palette.scss*.
            * `layout.scss` - defines base app layout styles.
            * `material.scss` - defines style rules that override or extend [Angular Material](https://material.angular.io/components/categories) components.
            * `palette.scss` - defines a map of color key values to use based on the light or dark theme.
            * `snacker.scss` - defines color styling rules for the [Material Snackbar](https://material.angular.io/components/snack-bar/overview) component used with the core [SnackerService](./overview/app/src/app/core/services/snacker.service.ts).
            * `theme.scss` - the base [Angular Material theme](https://material.angular.io/guide/theming) style file.
            * `utility.scss` - defines structural styles for various CSS properties such as *margin*, *padding*, *border-radius*, *cursor*, *overflow*, etc. For instance, `class="m4"` would set the style rule `margin: 4px;` on the element.
        * `favicon.ico` - A small icon associated with a web app displayed within browser tabs, bookmark bars, and title headings. See [What is a favicon?](https://favicon.io/tutorials/what-is-a-favicon/)
        * `index.html` - The main HTML page that is served when visiting the Angular app. The CLI automatically adds all JavaScript and CSS files when building your app.
        * `main.ts` - The main entry point for the Angular application. The `AppComponent` is bootstrapped here so it can be loaded in *index.html*. 
    * `.editorconfig` - used with the [Editorconfig](https://editorconfig.org/) VS Code extension, provides formatting convention rules for the underlying code editor.
    * `.gitignore` - tells the [Git](https://git-scm.com/) source control software which files in the project to ignore for change tracking and source control.
    * `angular.json` - provides workspace-wide and project-specific configuration defaults. These are used for build and development tools provided by the Angular CLI. See [Angular workspace configuration](https://angular.dev/reference/configs/workspace-config).
    * `package.json` - Node.js project configuration file. Among many things, specifies project metadata, `npm run` script definitions, and dependencies. See [package.json](https://docs.npmjs.com/cli/v6/configuring-npm/package-json).
    * `tsconfig.app.json` - specifies app-specific TypeScript configuration settings expanded from the root `tsconfig.json`.
    * `tsconfig.json` - TypeScript project configuration file. Also specifies Angular TypeScript compiler options. See [What is a tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) as well as [Angular compiler options](https://angular.dev/reference/configs/angular-compiler-options).

## App Cleanup

Before we get into building the app infrastructure, the `ApplicationConfig` located at *overview/app/src/app/app.config.ts* needs to be adjusted to provide the `HttpClient` service, as well as asynchronously load the animations services:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync()
  ]
};
```

Additionally, we need to clean up the [`HomeRoute`](./overview/app/src/app/routes/home.route.ts) component to remove all of the template sample code and give us a fresh starting point:

1. Open [*home.route.scss*](./overview/app/src/app/routes/home.route.scss) and delete all of the contents.

2. Open [*home.route.html*](./overview/app/src/app/routes/home.route.html) and set it to the following:

    ```html
    <h1 class="m8 mat-title">Home</h1>
    ```

3. Open [*home.route.ts*](./overview/app/src/app/routes/home.route.ts) and set it to the following:

    ```ts
    import { Component } from '@angular/core';

    @Component({
        selector: 'home-route',
        standalone: true,
        templateUrl: 'home.route.html',
        styleUrl: 'home.route.scss'
    })
    export class HomeRoute {}
    ```

## Model

In order to interface with the data models exposed by the REST API, we need to define a [TypeScript](https://www.typescriptlang.org/docs/handbook/) model that specifies the structure of the returned JSON data.

1. Inside of the *overview/app/src/app* directory, create a new directory named *models*.

2. Create a new file named *thing.ts* and give it the following value:

    ```ts
    export interface Thing {
        id: number;
        name: string;
        description: string;
    }
    ```

    An `interface` is preferred over a `class` because we only care about the shape of the data. For more details, see [TypeScript: Classes vs Interfaces](https://jameshenry.blog/typescript-classes-vs-interfaces/). 

3. In the *overview/app/src/app/models* directory, create a file named *index.ts* and give it the following value:

    ```ts
    export * from './thing';
    ```

    The pattern of specifying an *index.ts* at the root of a directory allows us to treat that directory as a [TypeScript module](https://jameshenry.blog/typescript-classes-vs-interfaces/), simplifying the way we reference infrastructure across the application.

## Service

Next, we need to create an [Angular Service](https://angular.dev/guide/di/creating-injectable-service) that allows us to interface with the REST API. This is done with the `@Injectable` [decorator](https://www.typescriptlang.org/docs/handbook/decorators.html) above the class definition.

For each public endpoint on [`ThingController`](./overview/node/Overview.Api/Controllers/ThingController.cs), we will define a function within the service that handles calling the corresponding endpoint.

1. In the *overview/app/src/app* directory, create a new folder named *services*.

2. In the new *services* directory, create a file named *thing.service.ts*:

    ```ts
    import { HttpClient } from '@angular/common/http';
    import { Injectable } from '@angular/core';
    import { firstValueFrom } from 'rxjs';
    import { environment } from '../../environments/environment';
    import { Thing } from '../models';

    @Injectable({
        providedIn: 'root'
    })
    export class ThingService {
        private api: string = `${environment.server}thing/`;

        constructor(
            private http: HttpClient
        ) { }

        getThings(): Promise<Thing[]> {
            return firstValueFrom(
                this.http.get<Thing[]>(
                    `${this.api}getThings`
                )
            );
        }

        getThing(id: number): Promise<Thing> {
            return firstValueFrom(
                this.http.get<Thing>(
                    `${this.api}getThing/${id}`
                )
            );
        }

        validateName(thing: Thing): Promise<boolean> {
            return firstValueFrom(
                this.http.post<boolean>(
                    `${this.api}validateName`,
                    thing
                )
            );
        }

        validate(thing: Thing): Promise<boolean> {
            return firstValueFrom(
                this.http.post<boolean>(
                    `${this.api}validate`,
                    thing
                )
            );
        }

        save(thing: Thing): Promise<Thing> {
            return firstValueFrom(
                this.http.post<Thing>(
                    `${this.api}save`,
                    thing
                )
            );
        }

        remove(thing: Thing): Promise<number> {
            return firstValueFrom(
                this.http.delete<number>(
                    `${this.api}remove`,
                    { body: thing }
                )
            );
        }
    }
    ```

3. Create an *index.ts* file with the following content:

    ```ts
    export * from './thing.service';
    ```

In `ThingService`, an `api` variable is created that extracts the root server URL from the [*environment.ts*](./overview/app/src/environments/environment.ts) file. Additionally, the [HttpClient](https://angular.dev/guide/http/making-requests#best-practices) service is injected into the constructor.

Each function signature matches the signature of its corresponding endpoint on the API controller. It executes an HTTP request to the endpoint, passing in any parameters or body data as required, and converts the resulting [Observable](https://rxjs.dev/guide/observable) into a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) via the [`firstValueFrom`](https://rxjs.dev/api/index/function/firstValueFrom) function.

## Route

Now that we have a data model and a service, we can setup our [`HomeRoute`](./overview/app/src/app/routes/home.route.ts) to retrieve and render our `Thing` data.

> Routes are nothing more than components that are registered as the root component for a URL endpoint. The following sections will have you performing some simple component configuration, but you will have a deeper dive into components in the [Components](#components) section.

### Route Logic

To start, we need to configure [*home.route.ts*](./overview/app/src/app/routes/home.route.ts) with the infrastructure it will need to retrieve and track `Thing` data:

```ts
import {
    Component,
    OnInit
} from '@angular/core';

import { ThingService } from '../services';
import { Thing } from '../models';

@Component({
    selector: 'home-route',
    standalone: true,
    templateUrl: 'home.route.html',
    styleUrl: 'home.route.scss',
    providers: [
        ThingService
    ]
})
export class HomeRoute implements OnInit {
    things: Thing[] = [];

    constructor(
        private thingSvc: ThingService
    ) { }

    async ngOnInit(): Promise<void> {
        this.things = await this.thingSvc.getThings();
    }
}
```

Lets unpack what is happening here. First, we imported the `OnInit` [Lifecycle Hook](https://angular.dev/guide/components/lifecycle), as well as `ThingService` and `Thing`. We added `ThingService` to the Component's [providers](https://angular.dev/guide/di/dependency-injection-providers) array, registering it with the component [dependency injection](https://angular.dev/guide/di/dependency-injection) container.

Then, we created a public `Thing[]` array named `things` and initialized it as an empty array, `[]`. An instance of `ThingService` is then injected in the constructor as the private property `thingSvc`. Finally, in the `ngOnInit` lifecycle hook, we initialize the value of `things` using the `ThingService.getThings()` function.

### Route Template

Now that the route logic has been defined, we need to define the structure of the route through its template, [*home.route.html*](./overview/app/src/app/routes/home.route.html):

```html
<h1 class="m8 mat-title">Home</h1>
@if (things.length > 0) {
    @for (thing of things; track thing.id) {
        <h3 class="m8 mat-h3 color-primary">{{thing.name}}</h3>
    }
} @else {
    <h3 class="m8 mat-h3 color-warn">No Things Available</h3>
}
```

Here, we use [Control Flow](https://angular.dev/guide/templates/control-flow) syntax to determine if we have any `Thing` data available. If so, iterate through all of them and render the name using [Text Interpolation](https://angular.dev/guide/templates/interpolation). Otherwise, render a message indicating *"No Things Available"*.

Run the API and the App simultaneously as follows:

1. Open the terminal in VS Code with <kbd>CTRL + `</kdb>.
2. Open a split terminal by ensuring focus is in the terminal panel and using the <kbd>CTRL + SHIFT + 5</kbd> shortcut.
    * The shortcut for opening a new terminal altogether is <kbd>CTRL + SHIFT + `</kbd>.
3. In the left terminal, execute the following:
    ```bash
    cd <path-to-overview>/node/Overview.Api
    dotnet run
    ```
4. In the right terminal, execute the following:
    ```bash
    cd <path-to-overview>/app
    npm run start
    ```

Open your browser and navigate to http://localhost:3000. You will see the home screen along with the message *No Things Available*.

If you've been following along from the beginning, you'll remember that we added a `Thing` when testing out the API Swagger interface. That means that we should be seeing the name of at least one `Thing` object.

If you press the <kbd>F12</kbd> key in the browser, you will see that the API is blocking requests from our app because it has not been configured to accept cross-origin requests (see [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)). Let us fix that now.

![spa-pre-cors](./assets/spa-pre-cors.png)

### Enable CORS on the API Server

In this scenario, we are going to configure the API to create a CORS setup that allows requests from any origin.

In the *overview/node/Overview.Api* directory, open *Program.cs* and adjust it as follows:

```cs
// just below builder.Services.AddDbContext<AppDbContext>(...)

builder
    .Services
    .AddCors(o => o.AddDefaultPolicy(builder =>
    {
        builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    }));

// just above builder.Services.AddScoped<ThingService>();

// just below app.UseSwaggerUI();
app.UseCors();
// just above app.UseRouting();
```

Stop the node in the left terminal window with <kbd>CTRL + C</kbd> and re-start it with `dotnet run`.

If you refresh the Angular app, you should see the name *Awesome Thing* rendered and all console errors cleared:

![spa-post-cors](./assets/spa-post-cors.png)

For details on configuring CORS in ASP.NET Core, see [Enable Cross-Origin Requests (CORS) in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-8.0).

For an example of a more restrictive CORS setup, see [`ConfigureDefaultCors`](https://github.com/JaimeStill/distributed-design/blob/main/nodes/core/Extensions/ServiceExtensions.cs#L51) along with an [`appsettings.CorsOrigin`](https://github.com/JaimeStill/distributed-design/blob/main/nodes/workflows/Workflows.Api/appsettings.Development.json#L21) configuration.

## Components

[Angular Components](https://angular.dev/guide/components) are the fundamental building block for creating applications in Angular. At a minimum, consist of:

* An `@Component` decorator that contains some configuration.
* A CSS selector that defines how the component is used in HTML.
* An HTML template that defines the structure of the component.
* A TypeScript class that defines the logic of the component, such as managing state, handling user input, etc.

Components can optionally define a CSS or SCSS file that defines encapsulated styling rules for the component. Any style rules defined apply only to the component.

Angular also provides the following features for components that make them extremely powerful:

* [**Input Properties**](https://angular.dev/guide/components/inputs) - Define the data that can be provided to the component through attributes.

* [**Output Properties**](https://angular.dev/guide/components/outputs) - Define functional events that allow you to react to changes or interactions with your component

* [**Lifecycle Hooks**](https://angular.dev/guide/components/lifecycle) - Allow you to execute logic at critical points in the lifecycle of the component.

### Thing List Component

Rather than hardcoding the infrastructure for retrieving and rendering the list of `Thing` data into a route, we should encapsulate it into its own component.

1. In the *overview/app/src/app* directory, create a folder named *components*.

2. Inside of the new *components* folder, create the following files:
    * *thing-list.component.ts*
    * *thing-list.component.html*
    * *index.ts*

To create the skeleton of a component, specify the following in *thing-list.component.ts*:

```ts
import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'thing-list',
    templateUrl: 'thing-list.component.html'
})
export class ThingListComponent {}
```

At this point, our component meets all of the minimum requirements. If we import the component into another component, we could use it with the `<thing-list>` element tag. However, since the *thing-list.component.html* template does not include any HTML code, it would not render anything.

However, before worrying about the component template, let's migrate the `Thing` logic out of `HomeRoute` and into `ThingListComponent`.

One additional change we should make is to make the `thing` array nullable and initialize it as `null`. This way, we can add an additional state to our template flow control to indicate that the HTTP request is loading. Even if there are no `Thing` records in the database, the HTTP request will still return an empty array.

**thing-list.component.ts**

```ts
import {
    Component,
    OnInit
} from '@angular/core';

import { ThingService } from '../services';
import { Thing } from '../models';

@Component({
    standalone: true,
    selector: 'thing-list',
    templateUrl: 'thing-list.component.html',
    providers: [ ThingService ]
})
export class ThingListComponent implements OnInit {
    things: Thing[] | null = null;

    constructor(
        private thingSvc: ThingService
    ) { }

    async ngOnInit(): Promise<void> {
        this.things = await this.thingSvc.getThings();
    }
}
```

The syntax `things: Thing[] | null` is a [TypeScript Union](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types), or a way of indicating that a variable can be of any of the types specified.

**home.route.ts**

Note that since we aren't actually adding any component styling to `HomeRoute`, we can go ahead and delete *home.route.scss* and remove it from the `@Component` decorator.

```ts
import { Component } from '@angular/core';

@Component({
    selector: 'home-route',
    standalone: true,
    templateUrl: 'home.route.html'
})
export class HomeRoute { }
```

Now that the logic for the component is established, we can build out the template by simply cutting and pasting the `@if / @else` control flow statement infrastructure into the template file. We also need to adjust it to account for the fact that `things` can now be `null`:

**thing-list.component.html**

```html
@if (things === null) {
    <h3 class="m8 mat-h3">Loading...</h3>
}
@else if (things.length > 0) {
    @for (thing of things; track thing.id) {
        <h3 class="m8 mat-h3 color-primary">{{thing.name}}</h3>
    }
} @else {
    <h3 class="m8 mat-h3 color-warn">No Things Available</h3>
}
```

Before we can use `<thing-list>` in the `HomeRoute` template, we must first export it in `index.ts` and specify `ThingListComponent` in the `imports` array of the `@Component` decorator for `HomeRoute`:

**index.ts**

```ts
export * from './thing-list.component';
```

**home.route.ts**

```ts
import { Component } from '@angular/core';
import { ThingListComponent } from '../components';

@Component({
    selector: 'home-route',
    standalone: true,
    templateUrl: 'home.route.html',
    imports: [ ThingListComponent ]
})
export class HomeRoute { }
```

Now we can use `<thing-list>` in the `HomeRoute` template:

**home.route.html**

```html
<h1 class="m8 mat-title">Home</h1>
<thing-list></thing-list>
```

### Thing Card Component

Rendering a list of thing names is a helpful start, but it would be nice if we could provide a more robust interface for a `Thing` object instance. An interface that cleanly displays both the `name` and `description` properties, as well as actions for editing and removing the `Thing`.

To start, add the following files to the *components* folder:
* *thing-card.component.ts*
* *thing-card.component.html*

We will start by defining the basic component skeleton:

```ts
import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'thing-card',
    templateUrl: 'thing-card.component.html'
})
export class ThingCardComponent {}
```

Unlike the list component we defined before, this component does not interact with services to retrieve data. It is meant to simply receive data that it will render, and provide events to indicate when a user has performed a specific action.

Lets start by establishing the ability to provide data to the component:

```ts
import {
    Component,
    Input
} from '@angular/core';

import { Thing } from '../models';

@Component({
    standalone: true,
    selector: 'thing-card',
    templateUrl: 'thing-card.component.html'
})
export class ThingCardComponent {
    @Input({ required: true }) thing!: Thing;
}
```

The [Input decorator](https://angular.dev/guide/components/inputs) defines a property as an input property for a component, meaning the value of that property can be passed in via [property binding](https://angular.dev/guide/templates/property-binding) through a component attribute. This would look like:

```html
<thing-card [thing]="thing"></thing-card>
```

where the value of the provided `thing` object originates either from the underlying TypeScript file or elsewhere within the template (for instance, in a `@for` control flow statement).

Next, we need to define events that expose the ability for a user to edit or remove the `Thing` object:

```ts
import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';

import { Thing } from '../models';

@Component({
    standalone: true,
    selector: 'thing-card',
    templateUrl: 'thing-card.component.html'
})
export class ThingCardComponent {
    @Input({ required: true }) thing!: Thing;
    @Output() edit = new EventEmitter<Thing>();
    @Output() remove = new EventEmitter<Thing>();
}
```

The [Output decorator](https://angular.dev/guide/components/outputs) defines an event emitter as an output property. The `EventEmitter` exposes an `emit` function that you call when you want a component consumer to react to the corresponding event. If `EventEmitter` is defined without a type, it will simply trigger the event without providing any event data. If `EventEmitter` is defined with a type, in our case `EventEmitter<Thing>`, you must provide an object of that type to the `emit` function: `edit.emit(this.thing)`.

Registering to handle events is done as follows:

```html
<thing-card (edit)="editThing($event)"></thing-card>
```

Whenever `edit.emit(this.thing)` is executed in the `ThingCardComponent`, the `editThing` function will be executed in the parent component, receiving the provided `Thing` object through the `$event` keyword. See [Event Handling](https://angular.dev/essentials/handling-user-interaction#event-handling).

Finally, let us import the `FlexModule` and `MatButtonModule` to simplify structuring the template layout and allow us to use [Material Button](https://material.angular.io/components/button/overview) components:

**thing-card.component.ts**

```ts
import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { FlexModule } from '../flex';
import { Thing } from '../models';

@Component({
    standalone: true,
    selector: 'thing-card',
    templateUrl: 'thing-card.component.html',
    imports: [
        MatButtonModule,
        FlexModule
    ]
})
export class ThingCardComponent {
    @Input({ required: true }) thing!: Thing;
    @Output() edit = new EventEmitter<Thing>();
    @Output() remove = new EventEmitter<Thing>();
}
```

Next, we will create the template for the card. This is pretty straightforward:

**thing-card.component.html**

```html
<div class="border-divider rounded background-card"
     flexContainer
     flexDirection="column"
     flexMain="start"
     flexCross="stretch"
     [style.width.px]="360">
    <h1 class="m8 mat-h1">{{thing.name}}</h1>
    <p class="m8">{{thing.description}}</p>
    <div class="p8 background-default rounded-bottom"
         flexContainer
         flexMain="end"
         flexCross="center"
         flexGap="8px">
        <button mat-button
                color="warn"
                (click)="remove.emit(thing)">Remove</button>
        <button mat-button
                color="primary"
                (click)="edit.emit(thing)">Edit</button>
    </div>
</div>
```

Export `ThingCardComponent` in *index.ts*:

**index.ts**

```ts
export * from './thing-card.component';
```

### Use Thing Card Component

Now that the component is defined, we can use it inside of the `ThingListComponent`. First, let us import both `ThingCardComponent` and `FlexModule` in *thing-list.component.ts* to enable us to properly structure rendering a collection of `Thing` objects:

```ts
import {
    Component,
    OnInit
} from '@angular/core';

import { ThingCardComponent } from './thing-card.component';
import { FlexModule } from '../flex';
import { ThingService } from '../services';
import { Thing } from '../models';

@Component({
    standalone: true,
    selector: 'thing-list',
    templateUrl: 'thing-list.component.html',
    providers: [ ThingService ],
    imports: [
        FlexModule,
        ThingCardComponent
    ]
})
export class ThingListComponent implements OnInit {
    things: Thing[] | null = null;

    constructor(
        private thingSvc: ThingService
    ) { }

    async ngOnInit(): Promise<void> {
        this.things = await this.thingSvc.getThings();
    }
}
```

We can now adjust the template to use the `<thing-card>` component instead of just rendering the name directly:

```html
@if (things === null) {
    <h3 class="m8 mat-h3">Loading...</h3>
}
@else if (things.length > 0) {
    <div class="p8" flexContainer flexMain="start" flexCross="start" flexGap="8px">
        @for (thing of things; track thing.id) {
            <thing-card [thing]="thing"></thing-card>
        }
    </div>
} @else {
    <h3 class="m8 mat-h3 color-warn">No Things Available</h3>
}
```

The next thing we need to do is handle the `edit` and `remove` events. For now, we will simply log the received event objects to the console. We will properly wire these events to enable editing and removal in the [Finalizing the App](#finalizing-the-app) section at the end.

First, add the following `edit` and `remove` functions to *thing-list.component.ts*:

```ts
// just below ngOnInit
edit (thing: Thing) {
    console.log('Edit Thing', thing);
}

remove(thing: Thing) {
    console.log('Remove Thing', thing);
}
```

Then in the `<thing-card>` element in the template, register the events:

```html
<thing-card [thing]="thing"
            (edit)="edit($event)"
            (remove)="remove($event)"></thing-card>
```

If you run the server and app now, you will can see the new `ThingCardComponent` rendered in the list component:

![spa-component-elements](./assets/spa-component-elements.png)

If you click on the **Edit** and **Remove** buttons with the console open, you will see the `Thing` object output to the console:

![spa-component-events](./assets/spa-component-events.png)

## Form

The first step towards providing a management interface for a data model is to define a [form](https://developer.mozilla.org/en-US/docs/Learn/Forms). Angular has a powerful feature called [Reactive forms](https://angular.dev/guide/forms/reactive-forms) that builds upon the native web forms infrastructure. It allows you to easily define form controls and implement features such as input validation. There are two steps to defining a form:

1. Defining a function that returns the structure of the form inside of a [`FormGroup`](https://angular.dev/guide/forms/reactive-forms#generate-a-new-component-with-a-formcontrol)

2. Define a component that maps the `FormGroup` to a `<form>` and its `FormControl` properties, which are tied to a data model property and bound to HTML form control elements (e.g. - `<input>`, `<select>`, etc.).

### `FormGroup` Function

Before we can build out form controls, we need to define a function that generates a `FormGroup`. This can be defined in the *thing.ts* file created in the [Model](#model) section above.

```ts
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';

export interface Thing {
    id: number;
    name: string;
    description: string;
}

export function GenerateThingForm(thing: Thing, fb: FormBuilder): FormGroup {
    return fb.group({
        id: [thing.id],
        name: [
            thing.name || '',
            Validators.required
        ],
        description: [thing.description]
    });
}
```

The [`FormBuilder`](https://angular.dev/guide/forms/reactive-forms#inject-the-formbuilder-service) is an injectable provider that is provided with the reactive forms module.

`fb.group()` creates a new `FormGroup`, which is an object composed of `FormControl` objects. 

The `name` property is a little different from the other properties; it specifies two different features:
* If `thing.name` does not have a value, it defaults to the empty string, `''`. Additionally, a [`Validator`](https://angular.dev/guide/forms/form-validation#built-in-validator-functions) is associated with the form control indicating that `name` is a required form field. If no value is present on the form control, the overall form state will be marked invalid.

### Extended Form Infrastructure

There are two capabilities that I typically define to enhance the form experience:

* The ability to execute asynchronous validation calls on specific properties on the server, i.e. - verifying that a specified `name` is unique.

* The ability to cache the state of the form in browser storage as it is being filled out. This way, if you leave the form and come back to it, you still have your filled in data until you either save or clear the cache.

#### API Validator

The built-in support for [asynchronous validation](https://angular.dev/guide/forms/form-validation#creating-asynchronous-validators) is limiting in that it is tied to the form control element that the validation is being executed against. This means that your custom validator will only have access to the value of the property being validated, not the state of the overall object represented by the form.

If you'll recall, our [`ThingService.validateName`](./overview/app/src/app/services/thing.service.ts#L33) function requires you to post the full `Thing` object to the API to validate its name so it can also check the `id` of the object being compared.

#### Storage Form

### Form Component

Now that we can generate a `FormGroup` for our data model, we need to define the UI component that encapsulates a root `<form>` element and exposes form controls.

1. In the *overview/app/src/app* directory, create a directory named *forms*.

2. Create the following files in the *forms* directory:

    * *thing.form.ts*
    * *thing.form.html*
    * *index.ts*

## Dialogs

## Finalizing the App