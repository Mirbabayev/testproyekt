import { CatalogData, defaultCatalogData } from '../types';
import {
  updateCatalogData,
  addBrand,
  addCategory,
  addBottleSize,
  addConcentration,
  addFragranceGroup,
  addNote
} from '../catalog-actions';

describe('Catalog Actions', () => {
  let testData: CatalogData;

  beforeEach(() => {
    testData = { ...defaultCatalogData };
  });

  test('updateCatalogData updates data correctly', () => {
    const newData: Partial<CatalogData> = {
      brands: ['New Brand']
    };

    const result = updateCatalogData(testData, newData as CatalogData);
    expect(result.brands).toEqual(['New Brand']);
  });

  test('addBrand adds new brand correctly', () => {
    const result = addBrand(testData, 'New Brand');
    expect(result).toBe(true);
    expect(testData.brands).toContain('New Brand');
  });

  test('addBrand does not add duplicate brand', () => {
    const result = addBrand(testData, testData.brands[0]);
    expect(result).toBe(false);
  });

  test('addCategory adds new category correctly', () => {
    const result = addCategory(testData, 'New Category');
    expect(result).toBe(true);
    expect(testData.categories).toContain('New Category');
  });

  test('addBottleSize adds new size correctly', () => {
    const result = addBottleSize(testData, '250ml');
    expect(result).toBe(true);
    expect(testData.bottleSizes).toContain('250ml');
  });

  test('addConcentration adds new concentration correctly', () => {
    const result = addConcentration(testData, 'New Concentration');
    expect(result).toBe(true);
    expect(testData.concentrations).toContain('New Concentration');
  });

  test('addFragranceGroup adds new group correctly', () => {
    const result = addFragranceGroup(testData, 'New Group');
    expect(result).toBe(true);
    expect(testData.fragranceGroups).toContain('New Group');
  });

  test('addNote adds new note correctly', () => {
    const result = addNote(testData, 'top', 'New Note');
    expect(result).toBe(true);
    expect(testData.notes.top).toContain('New Note');
  });
}); 