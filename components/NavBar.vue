<template>
  <nav
    class="navbar navbar-expand-md fixed-top navbar-dark"
    role="navigation"
    style="background-color: var(--tp-blue-4)"
  >
    <div class="container">
      <NuxtLink to="/" class="navbar-brand" alt="termportalen.no"
        >termportalen.no</NuxtLink
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <NuxtLink to="/about" class="nav-link active">
              {{ $t("navBar.about") }}
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/config" class="nav-link active">
              {{ $t("navBar.config") }}
            </NuxtLink>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle active"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
            >
              Menu
            </a>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
