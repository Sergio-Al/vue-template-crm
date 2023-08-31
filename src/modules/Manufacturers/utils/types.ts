export interface Manufacturer {
    id: string;
    annual_revenue: string;
    archivo_c: string;
    assigned_user_id?: string;
    billing_address_city: string;
    billing_address_country: string;
    billing_address_postalcode: string;
    billing_address_state: string;
    billing_address_street: string;
    created_by?: string;
    date_entered: string;
    date_modified: string;
    deleted?: string;
    description?: string;
    employees: string;
    email1: string;
    hanp_proveedores_type?: string;
    idgrupo_c: string;
    idproveedor_c: string;
    industry: string;
    modified_user_id: string;
    name: string;
    nit_ci_c: string;
    ownership: string;
    phone_alternate: string;
    phone_fax: string;
    phone_office: string;
    rating: string;
    shipping_address_city: string;
    shipping_address_country: string;
    shipping_address_postalcode: string;
    shipping_address_state: string;
    shipping_address_street: string;
    ticker_symbol: string;
    website: string;
    direccion: string;
  }

  export interface Filter {
    account?: string;
    name?: string;
    pst_code?: string;
    aio_code?: string;
    status?: string;
    start_date?: string;
    end_date?: string;
    country?: string;
    state?: string;
    city?: string;
    created_by?: string[];
    modified_by?: string[];
    assigned_to?: string[];
    creation_date?: string;
    fastFilter?: string;
  }

  export interface Params {
    page: number;
    rowsPerPage: number;
    sortBy: string;
    order: string;
    filter: Filter;
  }

  export interface Pagination {
    page: number;
    sortBy: string;
    descending: boolean;
    rowsPerPage: number;
    rowsNumber: number;
  }

  export interface PaginationTable {
    sortBy: string;
    descending: boolean;
    page: number;
    rowsPerPage: number;
    rowsNumber?: number;
  }

  export interface UpdateMassiveModel {
    pais_c?: string;
    priority?: string;
    status?: string;
  }
  