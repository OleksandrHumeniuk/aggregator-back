import { Injectable } from '@nestjs/common';

import type { Package } from './package.model';

@Injectable()
export class PackageService {
  private packages: Package[] = [
    {
      id: '1',
      name: 'Package 1',
      description: 'Description 1',
    },
    {
      id: '2',
      name: 'Package 2',
      description: 'Description 2',
    },
    {
      id: '3',
      name: 'Package 3',
      description: 'Description 3',
    },
  ];

  getPackages(): Package[] {
    return this.packages;
  }

  getPackage(id: string): Package {
    return this.packages.find((item) => item.id === id);
  }

  createPackage(name: string): Package {
    const newPackage: Package = {
      id: (this.packages.length + 1).toString(),
      name: `Package ${name}`,
      description: `Description ${this.packages.length + 1}`,
    };

    this.packages.push(newPackage);
    return newPackage;
  }
}
