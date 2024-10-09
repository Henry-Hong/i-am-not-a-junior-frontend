import {
  PetApi,
  StoreApi,
  UserApi,
  Configuration,
  ConfigurationParameters,
} from "./output/index";

// @ts-expect-error
import { server } from "./mock/node";

server.listen();

const configParams: ConfigurationParameters = {
  basePath: "http://localhost:3000",
};

const config = new Configuration(configParams);

const petService = new PetApi(config);

(async () => {
  const addedPet = await petService.addPet({
    pet: {
      name: "kitty",
      photoUrls: ["photo1", "photo2", "photo3"],
      category: { id: 1, name: "Dogs" },
    },
  });
  console.log("🌝", addedPet);

  const promise1 = petService.getPetById({ petId: 1 });
  const promise2 = petService.getPetById({ petId: 1 });
  const promise3 = petService.getPetById({ petId: 1 });

  const result = await Promise.allSettled([promise1, promise2, promise3]); // allSettled는 실패하더라도, 바로 Promise를 바로 reject하지 않음 ㅎ
  console.log("🌝🌝", result);
})();
