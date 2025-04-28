import k from "./kRun.js"
import {resourceLoader, getColourCombos} from "./resourceLoad.js";
import "./sceneLoader.js"

resourceLoader()

k.go("game", 3)