import axios from 'axios';

export const wilayahService = {
  async getProvinces() {
    const response = await axios.get('https://wilayah.id/api/provinces.json');
    return response.data.data;
  },
  async getRegencies(provinceCode: string) {
    const response = await axios.get(`https://wilayah.id/api/regencies/${provinceCode}.json`);
    return response.data.data;
  },
  async getDistricts(regencyCode: string) {
    const response = await axios.get(`https://wilayah.id/api/districts/${regencyCode}.json`);
    return response.data.data;
  },
  async getVillages(districtCode: string) {
    const response = await axios.get(`https://wilayah.id/api/villages/${districtCode}.json`);
    return response.data.data;
  }
};
