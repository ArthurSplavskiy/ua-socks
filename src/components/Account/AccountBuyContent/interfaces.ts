type TariffName = 'STANDART' | 'SHARED';

type ObjType = Record<string, string | []>;

export interface IPackage {
  package_id: number;
  package_name: string;
  package_price: string;
  package_term: number;
  package_tariff_id: number;
  package_operator_id: number;
  package_operator_name: string;
  package_status: 'active';
  price: string;
}

export interface ITariff {
  tariff_id: number;
  tariff_name: TariffName;
  tariff_status: 'active';
  packages: IPackage[];
  attributes: [
    {
      writeLimit: string;
    }
  ];
}

export interface IRegionTariffs {
  regions: {
    number: string;
  };
  region_data: [
    {
      region_id: number;
      region_name: string;
      region_status: 'active';
      tariffs: ITariff[];
      operators: ObjType[];
      terms: ObjType[];
    }
  ];
}
