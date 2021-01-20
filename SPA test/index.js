import Home from "./views/Home.js";
import Cone from "./views/Cone.js";

const navigateTo = url => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: Home },
    { path: "/cone", view: Cone },
  ];

  const potentialMatches = routes.map(route => {
    return {
      route: route,
      isMatch: location.pathname === route.path
    };
  });

  let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  const view = new match.route.view();
  document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("submit", e => {
    e.preventDefault();

    let cone = [];

    cone[0] = +e.target.radius.value;
    cone[1] = +e.target.height.value;
    cone[2] = +e.target.segments.value;

    console.log(JSON.stringify(cone));
    navigateTo("/cone");
  })

  router();
});