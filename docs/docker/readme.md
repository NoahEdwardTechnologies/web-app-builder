# installation notes

## dont use yarn, use npm
  - [it checks for dev deps](https://github.com/yarnpkg/yarn/issues/4190)
  - however, we are moving our dist dir into docker and only want the production dependencies

## local
### installation for ubuntu 17.10
  - [follow this](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/#install-docker-ce-1)
  - then use cmd below to install
    ```sh
      $ sudo add-apt-repository \
        "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
        $(lsb_release -cs) \
        edge"
    ```

### post installation steps
  - [follow this](https://docs.docker.com/engine/installation/linux/linux-postinstall/)

## production installation
  - I generally use a server matching my local env, thus these notes are also for 17.10
  - [follow this](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/#install-docker-ce-1)
  ```sh
    # run the cmd locally to see which repo you're using
    $ apt-cache madison docker-ce

    # now install the specific version on your prod Server using the string in the second column, e.g.
    $ sudo apt-get install docker-ce='17.11.0~ce-0~ubuntu'
  ```
