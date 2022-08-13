import { Test } from '@nestjs/testing';
import { Hero } from '@prisma/client';
import { SuperheroCreateDTO } from './dtos/superhero.create.dto';
import { SuperheroEditDTO } from './dtos/superhero.edit.dto';
import { SuperheroService } from './services/superhero.service';
import { SuperheroController } from './superhero.controller';

describe('SuperheroController', () => {
  let heroController: SuperheroController;

  const mockHeroService = {
    getHeroes: jest.fn(() =>
      Promise.resolve({
        data: [
          {
            id: '88fca2e5-082e-4d49-8b83-4359c121a9c2',
            nickname: 'mockhero 1',
            real_name: 'real name 1',
            origin_description: 'mock origin 1',
            superpowers: 'mock superpowers 1',
            catch_phrase: 'Mock phrase 1',
            image_paths: ['mock_path_1.png'],
          },
          {
            id: 'bb5508d0-4f78-45f7-b65d-c54703512f09',
            nickname: 'mockhero 2',
            real_name: 'real name 2',
            origin_description: 'mock origin 2',
            superpowers: 'mock superpowers 2',
            catch_phrase: 'Mock phrase 2',
            image_paths: ['mock_path_2.png'],
          },
        ],
        total: 2,
      }),
    ),
    getHeroById: jest.fn((id: Hero['id']) =>
      Promise.resolve({
        id,
        nickname: 'mockhero 2',
        real_name: 'real name 2',
        origin_description: 'mock origin 2',
        superpowers: 'mock superpowers 2',
        catch_phrase: 'Mock phrase 2',
        image_paths: ['mock_path_2.png'],
      }),
    ),
    createHero: jest.fn((data: SuperheroCreateDTO) => {
      return { id: 'a07ceefb-69c3-4380-8bb5-cb217de2984c', ...data };
    }),
    removeHeroById: jest.fn((id: Hero['id']) =>
      Promise.resolve({
        id,
        nickname: 'mockhero 2',
        real_name: 'real name 2',
        origin_description: 'mock origin 2',
        superpowers: 'mock superpowers 2',
        catch_phrase: 'Mock phrase 2',
        image_paths: ['mock_path_2.png'],
      }),
    ),
    updateHeroById: jest.fn(
      (
        { id, ...newHero }: SuperheroEditDTO,
        files: Array<Express.Multer.File>,
      ) =>
        Promise.resolve({
          id,
          nickname: 'mockhero 2',
          real_name: 'real name 2',
          origin_description: 'mock origin 2',
          superpowers: 'mock superpowers 2',
          catch_phrase: 'Mock phrase 2',
          ...newHero,
          image_paths: files.map((file) => file.filename),
        }),
    ),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [SuperheroController],
      providers: [SuperheroService],
    })
      .overrideProvider(SuperheroService)
      .useValue(mockHeroService)
      .compile();

    heroController = moduleRef.get<SuperheroController>(SuperheroController);
  });

  it('should be defined', () => {
    expect(heroController).toBeDefined();
  });

  describe('getHeroes', () => {
    it('should return an array of heroes', async () => {
      expect(await heroController.getHeroes({ offset: 0, size: 5 })).toEqual({
        total: expect.any(Number),
        data: expect.any(Array<Hero>),
      });
      expect(mockHeroService.getHeroes).toBeCalledTimes(1);
    });
  });

  describe('getHero', () => {
    it('should return a hero', async () => {
      const uuid = {
        id: 'a07ceefb-69c3-4380-8bb5-cb217de2984c',
      };
      expect(await heroController.getHero(uuid)).toHaveProperty('id', uuid.id);
      expect(mockHeroService.getHeroById).toBeCalledWith(uuid.id);
    });
  });

  describe('createHero', () => {
    it('should return created hero', async () => {
      const dto = {
        nickname: 'mockhero 1',
        real_name: 'real name 1',
        origin_description: 'mock origin 1',
        superpowers: 'mock superpowers 1',
        catch_phrase: 'Mock phrase 1',
        image_paths: ['mock_path_1.png'],
      };
      expect(await heroController.createHero(dto, [])).toEqual({
        id: expect.any(String),
        ...dto,
      });
      expect(mockHeroService.createHero).toBeCalledWith(dto, []);
    });
  });

  describe('deleteHero', () => {
    it('should return deleted hero', async () => {
      const uuid = {
        id: 'a07ceefb-69c3-4380-8bb5-cb217de2984c',
      };
      expect(await heroController.deleteHero(uuid)).toHaveProperty(
        'id',
        uuid.id,
      );

      expect(mockHeroService.removeHeroById).toBeCalledWith(uuid.id);
    });
  });

  describe('updateHero', () => {
    it('should update the hero', async () => {
      const heroDTO = {
        id: '88fca2e5-082e-4d49-8b83-4359c121a9c2',
        nickname: 'mockhero 1',
        real_name: 'real name 1',
        origin_description: 'mock origin 1',
        superpowers: 'mock superpowers 1',
        catch_phrase: 'Mock phrase 1',
      };
      expect(await heroController.updateHero(heroDTO, [])).toEqual({
        ...heroDTO,
        image_paths: expect.any(Array<string>),
      });
      expect(mockHeroService.updateHeroById).toBeCalledWith(heroDTO, []);
    });
  });
});
