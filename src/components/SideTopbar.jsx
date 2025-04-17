import { Link, Outlet } from 'react-router-dom';

const SideTopbar = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-auto bg-light sticky-top">
          <div className="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-sm-start align-items-center p-2 sticky-top min-vh-100">
            <Link
              to="/"
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
            >
              <span className="fs-4 d-none d-sm-inline">EducaSis</span>
            </Link>

            <ul className="nav nav-pills flex-sm-column flex-row flex-nowrap w-100 mt-4 mb-auto justify-content-center align-items-sm-start align-items-center">
              <li className="nav-item w-100">
                <Link to="/" className="nav-link text-dark d-flex align-items-center">
                  <i className="bi-house fs-4 me-2"></i>
                  <span className="d-none d-sm-inline">Início</span>
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link to="#" className="nav-link text-dark d-flex align-items-center">
                  <i className="bi-speedometer2 fs-4 me-2"></i>
                  <span className="d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link to="#" className="nav-link text-dark d-flex align-items-center">
                  <i className="bi-table fs-4 me-2"></i>
                  <span className="d-none d-sm-inline">Tabelas</span>
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link to="#" className="nav-link text-dark d-flex align-items-center">
                  <i className="bi-heart fs-4 me-2"></i>
                  <span className="d-none d-sm-inline">Favoritos</span>
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link to="/buscar-alunos" className="nav-link text-dark d-flex align-items-center">
                  <i className="bi-people fs-4 me-2"></i>
                  <span className="d-none d-sm-inline">Alunos</span>
                </Link>
              </li>
            </ul>

            <div className="dropdown w-100">
              <a
                href="#"
                className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
                id="dropdownUser"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi-person-circle fs-4 me-2"></i>
                <span className="d-none d-sm-inline">Perfil</span>
              </a>
              <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser">
                <li><a className="dropdown-item" href="#">Novo projeto...</a></li>
                <li><a className="dropdown-item" href="#">Configurações</a></li>
                <li><a className="dropdown-item" href="#">Perfil</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Conteúdo das páginas */}
        <div className="col p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SideTopbar;
