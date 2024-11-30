# ZHANG Zirui
# zzhangje@connect.ust.hk

.data
title: 		.asciiz "COMP2611 Aircraft War Game"

space_string:		.asciiz " "

total_cnt:	.word 1 # the total number of 30 milliseconds

bullet_number:	.word 0 # the number of 30 milliseconds, every 10 * 30 milliseconds, generate a bullet

small_enemy_number:	.word 0 # the number of small enemies, 2 small enemies, one medium boss

medium_enemy_number:	.word 0 # the number of medium enemies, 2 medium enemies, one large boss

bullet_enemy_number:	.word 0 # the number of 30 milliseconds, 40 to generate a bullet for the enemy

input_key:	.word 0 # input key from the player

width:		.word 480 # the width of the screen
height:		.word 700 # the height of the screen

# list of self bullets, 100-119
self_bullet_list:	.word -1:25
# [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119]
# all the elements are -1 at first, which means no bullet
# if a bullet is created, the id of the bullet will be stored in the list
# if a bullet is destoried, the id of the bullet will be set to -1
self_bullet_address:	.word self_bullet_list

# list of enemies, 500-519
enemy_list:		.word -1:25
# [500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519]
# all the elements are -1 at first, which means no enemy
# if an enemy is created, the id of the enemy will be stored in the list
# if an enemy is destoried, the id of the enemy will be set to -1
enemy_address:	.word enemy_list

# list of enemy bullets, 900-999
enemy_bullet_list:	.word -1:105
# [900, 901, ..., 999]
# all the elements are -1 at first, which means no bullet
# if a bullet is created, the id of the bullet will be stored in the list
# if a bullet is destoried, the id of the bullet will be set to -1
enemy_bullet_address:	.word enemy_bullet_list


# score and left blood
score:		.word 0
left_blood:	.word 20
# destor small enemy: +3, medium enemy: +5, large enemy: +10, the score is obtained by syscall, you should not use 3 5 10 directly

# current_enemy_number
current_enemy_number:	.word 0 # temporary variable to store the current enemy number for your reference
current_enemy_number_2:	.word 0 # temporary variable to store the current enemy number for your reference

# current enemy bullet number
current_enemy_bullet_number:	.word 0 # temporary variable to store the current enemy bullet number for your reference

# current self bullet number
current_self_bullet_number:	.word 0 # temporary variable to store the current self bullet number for your reference

# TODO: [Optional] You can add more data variables here
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
win_win:     .asciiz "win!\n"
lose_lose:   .asciiz "lose!\n"

.text
main:		
	la $a0, title
	la $t0, width
	lw $a1, 0($t0)
	la $t0, height
	lw $a2, 0($t0)
	li $a3, 1 # 1: play the music, 0: stop the music
	li $v0, 100 # Create the Game Screen
	syscall		


init_game:
	# 1. create the ship
	li $v0, 101
	li $a0, 1 # the id of ship is 1
	li $a1, 180 # the x_loc of ship
	li $a2, 500 # the y_loc of ship
	li $a3, 25 # set the speed
	syscall

m_loop:		
	jal get_time
	add $s6, $v0, $zero # $s6: starting time of the game

	# store s6
	addi $sp, $sp, -4
	sw $s6, 0($sp)

	jal is_game_over # task 1: 15 points

	jal process_input # task 2: 15 points
	jal generate_self_bullet
	jal move_self_bullet
	jal destory_self_bullet

	jal create_enemy
	jal move_enemy
	jal destory_enemy

	jal generate_enemy_bullet # task 3: 20 points
	jal move_enemy_bullet
	jal destory_enemy_bullet

	jal collide_detection_enemy # task 4: 15 points
	jal collide_detection_shoot_by_enemy # task 5: 15 points
	jal collide_detection_shoot_enemy # task 6: 20 points


	# refresh the screen
	li $v0, 119
	syscall

	# restore s6
	lw $s6, 0($sp)
	addi $sp, $sp, 4
	add $a0, $s6, $zero
	addi $a1, $zero, 30 # iteration gap: 30 milliseconds
	jal have_a_nap

	# total_cnt += 1
	lw $t0, total_cnt
	addi $t0, $t0, 1
	sw $t0, total_cnt


	j m_loop	


#--------------------------------------------------------------------
# func: is_game_over
# Check whether the game is over
# Pseduo code:
# if total_cnt >= 2000, then game over, win (2000 means 2000 * 30 ms)
# if blood <= 0, then game over, lose
#--------------------------------------------------------------------
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# TODO: check the total_cnt and blood {
is_game_over:
	addi $sp, $sp, -4
	sw $ra, 0($sp)
	
	lw $t0, left_blood
	blez $t0, game_over_lose # blood <= 0
	
	lw $t0, total_cnt
	addi $t0, $t0, -2000
	bgez $t0, game_over_win # total_cnt >= 2000
	
	lw $ra, 0($sp)
	addi $sp, $sp, 4
	jr $ra
	
game_over_win:
	li $v0, 4
	la $a0, win_win
	syscall
	li $v0, 140
	addi $a0, $zero, 1
	syscall
	jal game_over
	
game_over_lose:
	li $v0, 4
	la $a0, lose_lose
	syscall
	li $v0, 140
	addi $a0, $zero, 0
	syscall
	jal game_over
	
game_over:
	# move away the background and the floor leftwards
	
	# exit
	li $v0, 10
	syscall


#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++}

#--------------------------------------------------------------------
# func process_input
# Read the keyboard input and handle it!
#--------------------------------------------------------------------
process_input:	addi $sp, $sp, -4
	sw $ra, 0($sp)
	jal get_keyboard_input # $v0: the return value
	addi $t0, $zero, 119 # corresponds to key 'w'
	beq $v0, $t0, move_airplane_up
	addi $t0, $zero, 115 # 's'
	beq $v0, $t0, move_airplane_down
	addi $t0, $zero, 97
	beq $v0, $t0, move_airplane_left
	addi $t0, $zero, 100
	beq $v0, $t0, move_airplane_right
	# TODO: add more key bindings here, e.g., move_airplane_down: key 's', value 115, move_airplane_left: key 'a', value 97, move_airplane_right: key 'd', value 100 {
	#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++}
	j pi_exit
pi_exit:	
	lw $ra, 0($sp)
	addi $sp, $sp, 4
	jr $ra

#--------------------------------------------------------------------
# func get_keyboard_input
# $v0: ASCII value of the input character if input is available;
#      otherwise, the value is 0;
#--------------------------------------------------------------------
get_keyboard_input:
	addi $sp, $sp, -4
	sw $ra, 0($sp)
	add $v0, $zero, $zero
	lui $a0, 0xFFFF
	lw $a1, 0($a0)
	andi $a1, $a1, 1
	beq $a1, $zero, gki_exit
	lw $v0, 4($a0)


gki_exit:	lw $ra, 0($sp)
	addi $sp, $sp, 4
	jr $ra


#--------------------------------------------------------------------
# func: move_airplane
# Move the airplane
#--------------------------------------------------------------------
move_airplane_up:
	# if keyboard input is 'w', move the airplane up
	addi $sp, $sp, -12
	sw $ra, 8($sp)
	sw $s0, 4($sp)
	sw $s1, 0($sp)
	li $v0, 110 # get the location of the airplane
	li $a0, 1 # id of the airplane
	syscall
	add $s0, $v0, $zero # x location
	add $s1, $v1, $zero # y	location
	
	# judge $s1 - 25 >= 0
	addi $t0, $s1, -25
	bltz $t0, move_airplane_exit
	# move the airplane up
	addi $s1, $s1, -25
	li $v0, 120
	li $a0, 1 # id of the airplane
	add $a1, $s0, $zero
	add $a2, $s1, $zero
	syscall
	j move_airplane_exit

# TODO: add more contents here, e.g., move_airplane_down, move_airplane_left, move_airplane_right, please consider the boundary of the screen {
move_airplane_down:
	addi $sp, $sp, -12
	sw $ra, 8($sp)
	sw $s0, 4($sp)
	sw $s1, 0($sp)
	li $v0, 110 # get the location of the airplane
	li $a0, 1 # id of the airplane
	syscall
	add $s0, $v0, $zero # x location
	add $s1, $v1, $zero # y	location
	
	# judge $s1 + 25 <= 700
	# 700-25-126
	addi $t0, $s1, -549
	bgtz $t0, move_airplane_exit
	# move the airplane up
	addi $s1, $s1, 25
	li $v0, 120
	li $a0, 1 # id of the airplane
	add $a1, $s0, $zero
	add $a2, $s1, $zero
	syscall
	j move_airplane_exit
	
move_airplane_left:
	# if keyboard input is 'w', move the airplane up
	addi $sp, $sp, -12
	sw $ra, 8($sp)
	sw $s0, 4($sp)
	sw $s1, 0($sp)
	li $v0, 110 # get the location of the airplane
	li $a0, 1 # id of the airplane
	syscall
	add $s0, $v0, $zero # x location
	add $s1, $v1, $zero # y	location
	
	# judge $s0 - 25 >= 0
	addi $t0, $s0, -25
	bltz $t0, move_airplane_exit
	# move the airplane up
	addi $s0, $s0, -25
	li $v0, 120
	li $a0, 1 # id of the airplane
	add $a1, $s0, $zero
	add $a2, $s1, $zero
	syscall
	j move_airplane_exit

move_airplane_right:
	addi $sp, $sp, -12
	sw $ra, 8($sp)
	sw $s0, 4($sp)
	sw $s1, 0($sp)
	li $v0, 110 # get the location of the airplane
	li $a0, 1 # id of the airplane
	syscall
	add $s0, $v0, $zero # x location
	add $s1, $v1, $zero # y	location
	
	# judge $s1 + 25 + 102 <= 480
	# 480-25-102
	addi $t0, $s0, -353
	bgtz $t0, move_airplane_exit
	# move the airplane up
	addi $s0, $s0, 25
	li $v0, 120
	li $a0, 1 # id of the airplane
	add $a1, $s0, $zero
	add $a2, $s1, $zero
	syscall
	j move_airplane_exit

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++}

move_airplane_exit:
	lw $ra, 8($sp)
	lw $s0, 4($sp)
	lw $s1, 0($sp)
	addi $sp, $sp, 12
	jr $ra

	
#--------------------------------------------------------------------
# func: generate_self_bullet
# Generate airplane's bullet
#--------------------------------------------------------------------
generate_self_bullet:
	# if bullet_number == 10, generate a bullet, else bullet_number++
	lw $t0, bullet_number
	addi $t1, $zero, 10

	beq $t0, $t1, generate_self_bullet_create
	addi $t0, $t0, 1
	sw $t0, bullet_number
	jr $ra


generate_self_bullet_create:
	# set bullet_number = 0
	addi $t0, $zero, 0
	sw $t0, bullet_number

	# get the location of the airplane
	li $v0, 110
	li $a0, 1 # id of the airplane
	syscall
	add $s0, $v0, $zero # x location
	add $s1, $v1, $zero # y	location

	# create a bullet, id starts from 100
	addi $t0, $zero, 100
	lw $t1, self_bullet_address
	la $t2, self_bullet_list

	# difference between t1 and t2
	sub $t2, $t1, $t2

	# t2 = t2 / 4
	srl $t2, $t2, 2

	beq $t2, 20, generate_self_bullet_from_beginning

	add $t0, $t0, $t2

	# store t0 to t1-th element of self_bullet_list
	sw $t0, 0($t1)

	addi $t1, $t1, 4
	sw $t1, self_bullet_address

	li $v0, 106 # create a bullet
	move $a0, $t0 # the id of the bullet
	add $a1, $s0, $zero
	add $a2, $s1, $zero
	add $a3, $s2, $zero
	syscall

	jr $ra

generate_self_bullet_from_beginning:
	la $t2, self_bullet_list
	sw $t2, self_bullet_address
	j generate_self_bullet_create

#--------------------------------------------------------------------
# func: move_self_bullet
# Move the airplane's bullet
#--------------------------------------------------------------------
move_self_bullet:
	# find all the bullets in the self_bullet_list
	la $t0, self_bullet_list
	li $t3, -1

	j find_all_self_bullet


find_all_self_bullet:
	# get the first element of self_bullet_list
	lw $t1, ($t0)

	# if t3 == 20 then exit
	beq $t3, 20, move_self_bullet_exit
	addi $t3, $t3, 1

	# if t1 == -1, then continue
	beq $t1, -1, continue_find_next_available


	# get the location of the bullet
	move $a0, $t1
	li $v0, 110
	syscall

	move $s0, $v0 # x location
	move $s1, $v1 # y location

	j move_self_bullet_up


continue_find_next_available:
	addi $t0, $t0, 4
	j find_all_self_bullet

move_self_bullet_up:

	addi $s1, $s1, -6
	move $a0, $t1
	move $a1, $s0
	move $a2, $s1


	li $v0, 120
	syscall

	addi $t0, $t0, 4
	j find_all_self_bullet
	
move_self_bullet_exit:
	jr $ra

#--------------------------------------------------------------------
# func: destory_self_bullet
# Destory the airplane's bullet if it is out of the screen
#--------------------------------------------------------------------
destory_self_bullet:
	# find all the bullets in the self_bullet_list
	la $t0, self_bullet_list
	li $t3, -1

	j find_all_self_bullet_destory

find_all_self_bullet_destory:
	# get the first element of self_bullet_list
	lw $t1, ($t0)

	# if t3 == 20 then exit
	beq $t3, 20, destory_self_bullet_exit
	addi $t3, $t3, 1

	# if t1 == -1, then continue
	beq $t1, -1, continue_find_next_available_destory

	# get the location of the bullet
	move $a0, $t1
	li $v0, 110
	syscall

	move $s0, $v0 # x location
	move $s1, $v1 # y location

	# if y location <= 0, destory the bullet
	bltz $s1, destory_self_bullet_destory

	addi $t0, $t0, 4
	j find_all_self_bullet_destory

continue_find_next_available_destory:
	addi $t0, $t0, 4
	j find_all_self_bullet_destory

destory_self_bullet_destory:
	# destory the bullet
	move $a0, $t1
	li $v0, 116
	syscall

	# set the bullet to -1
	addi $t2, $zero, -1
	sw $t2, ($t0)

	addi $t0, $t0, 4
	j find_all_self_bullet_destory

destory_self_bullet_exit:
	jr $ra

#--------------------------------------------------------------------
# func: create_enemy
# Create the enemy
#--------------------------------------------------------------------
create_enemy:
	# if total_cnt % 120 == 0, create an enemy
	lw $t0, total_cnt
	addi $t1, $zero, 120
	div $t0, $t1
	mfhi $t2
	beq $t2, $zero, create_enemy_generate

	jr $ra

create_enemy_generate:
	# create an enemy, id starts from 500
	# small_enemy_number += 1
	lw $t7, small_enemy_number
	addi $t7, $t7, 1
	sw $t7, small_enemy_number

	addi $t0, $zero, 500
	lw $t1, enemy_address
	la $t2, enemy_list

	# difference between t1 and t2
	sub $t2, $t1, $t2

	# t2 = t2 / 4
	srl $t2, $t2, 2

	beq $t2, 20, create_enemy_from_beginning

	add $t0, $t0, $t2

	# store t0 to t1-th element of enemy_list
	sw $t0, 0($t1)

	addi $t1, $t1, 4
	sw $t1, enemy_address

	# judge small_enemy_number == 3
	lw $t4, small_enemy_number
	addi $t5, $zero, 3
	beq $t4, $t5, create_enemy_boss_1

	li $v0, 130 # create an enemy
	move $a0, $t0 # the id of the enemy
	li $a1, 1
	syscall

	jr $ra

create_enemy_boss_1:

	# compare medium_enemy_number == 2
	lw $t4, medium_enemy_number
	addi $t5, $zero, 2
	beq $t4, $t5, create_enemy_boss_2

	# medium_enemy_number += 1
	lw $t7, medium_enemy_number
	addi $t7, $t7, 1
	sw $t7, medium_enemy_number

	sw $zero, small_enemy_number

	li $v0, 130 # create an enemy
	move $a0, $t0 # the id of the enemy
	li $a1, 2
	syscall

	jr $ra

create_enemy_boss_2:

	sw $zero, medium_enemy_number
	sw $zero, small_enemy_number

	li $v0, 130 # create an enemy
	move $a0, $t0 # the id of the enemy
	li $a1, 3
	syscall

	jr $ra


create_enemy_from_beginning:
	la $t2, enemy_list
	sw $t2, enemy_address
	j create_enemy_generate

#--------------------------------------------------------------------
# func: move_enemy
# Move the enemy automatically
#--------------------------------------------------------------------
move_enemy:
	# find all the enemies in the enemy_list
	la $t0, enemy_list
	li $t3, -1

	j find_all_enemy

find_all_enemy:
	# get the first element of enemy_list
	lw $t1, ($t0)

	# if t3 == 20 then exit
	beq $t3, 20, move_enemy_exit
	addi $t3, $t3, 1

	# if t1 == -1, then continue
	beq $t1, -1, continue_find_next_available_enemy

	# get the location of the enemy
	move $a0, $t1
	li $v0, 110
	syscall

	move $s0, $v0 # x location
	move $s1, $v1 # y location

	j move_enemy_down


continue_find_next_available_enemy:
	addi $t0, $t0, 4
	j find_all_enemy

move_enemy_down:

	addi $s1, $s1, 2
	move $a0, $t1
	move $a1, $s0
	move $a2, $s1


	li $v0, 120
	syscall

	addi $t0, $t0, 4
	j find_all_enemy

move_enemy_exit:
	jr $ra

#--------------------------------------------------------------------
# func: destory_enemy
# Destory the enemy if it is out of the screen
#--------------------------------------------------------------------
destory_enemy:
	# find all the enemies in the enemy_list
	la $t0, enemy_list
	li $t3, -1

	j find_all_enemy_destory

find_all_enemy_destory:

	# get the first element of enemy_list
	lw $t1, ($t0)

	# if t3 == 20 then exit
	beq $t3, 20, destory_enemy_exit
	addi $t3, $t3, 1

	# if t1 == -1, then continue
	beq $t1, -1, continue_find_next_available_enemy_destory

	# get the location of the enemy
	move $a0, $t1
	li $v0, 110
	syscall

	move $s0, $v0 # x location
	move $s1, $v1 # y location

	# if y location >= 700, destory the enemy
	addi $t7, $s1, -700
	bgez $t7, destory_enemy_destory

	addi $t0, $t0, 4
	j find_all_enemy_destory

continue_find_next_available_enemy_destory:
	addi $t0, $t0, 4
	j find_all_enemy_destory

destory_enemy_destory:
	# destory the enemy
	move $a0, $t1
	li $v0, 116
	syscall

	# set the enemy to -1
	addi $t2, $zero, -1
	sw $t2, ($t0)

	addi $t0, $t0, 4
	j find_all_enemy_destory

destory_enemy_exit:
	jr $ra

#--------------------------------------------------------------------
# func: generate_enemy_bullet
# Generate enemy's bullet, each 40 * 30 milliseconds, generate a bullet
#--------------------------------------------------------------------
generate_enemy_bullet:
	la $t0, enemy_list
	li $t3, -1

	# if total_cnt % 41 == 0, generate a bullet
	lw $t4, total_cnt
	addi $t1, $zero, 41
	div $t4, $t1
	mfhi $t2
	beq $t2, $zero, generate_enemy_bullet_create

	jr $ra

# TODO: add more contents here {
generate_enemy_bullet_create:
# Pseduo code
# enemy_bullet_list: array of enemy bullets from 900 to 999, 100 slots. Consider circular search.
# enemy_list: array of enemies from 500 to 519, 20 slots. Consider circular search.
# for each enemy in enemy_list:
# 	if enemy != -1:
#		get the location of the enemy with syscall 110
#		generate a bullet for the enemy
#		if enemy is type 1:
#			generate a bullet for the enemy
#		if enemy is type 2:
#			generate two bullets for the enemy
#		if enemy is type 3:
#			generate three bullets for the enemy
#   else: continue to the next enemy	
	addi $sp, $sp, -4
	sw $ra, 0($sp)
	addi $t0, $zero, -4                               # i = 0
	continue_find_next_enemy:		
		# if i== 80
		addi $t0, $t0, 4                         # i += 4
		addi $t1, $zero, 80
		beq $t0, $t1, generate_enemy_bullet_exit # i == 80
		# if i== 80, break
		
		# if enemy == -1
		la $t1, enemy_list
		add $t1, $t1, $t0
		lw $t1, 0($t1)                           # $t1 = enemy id
		addi $t2, $zero, -1
		beq $t1, $t2, continue_find_next_enemy
		# if enemy == -1, continue
		
		srl $a0, $t0, 2
		addi $a0, $a0, 500
		li $v0, 110
		syscall
		# $v0: x
		# $v1: y
		# $a1: width_height_type
		# $a2: blood
		# $a3: original blood
		
		andi $t1, $a1, 3 # $t1 = enemy type
		addi $t2, $zero, 1
		beq $t1, $t2, generate_bullet_instance_type1
		addi $t2, $zero, 2
		beq $t1, $t2, generate_bullet_instance_type2
		addi $t2, $zero, 3
		beq $t1, $t2, generate_bullet_instance_type3	
		
		jal continue_find_next_enemy
		
generate_bullet_instance_type1:
# Pseduo code:
# create a bullet, id starts from 900
# store the id into the enemy_bullet_list and maintain the pointer
# get the location of the enemy
# store the location of the enemy to the bullet
# syscall 106 to create a bullet, with bullet_type is 1
	move $a1, $v0
	move $a2, $v1
	
	jal find_empty_bullet
	li $a3, 1
	li $v0, 106
	syscall	
	
	jal continue_find_next_enemy

generate_bullet_instance_type2:
# Pseduo code:
# create a bullet, id starts from 900
# store the id into the enemy_bullet_list and maintain the pointer
# get the location of the enemy
# store the location of the enemy to the bullet
# syscall 106 to create a bullet, with bullet_type is 2 and 3
	move $a1, $v0
	move $a2, $v1
	
	jal find_empty_bullet
	li $a3, 2
	li $v0, 106
	syscall	
	
	jal find_empty_bullet
	li $a3, 3
	li $v0, 106
	syscall	

	jal continue_find_next_enemy

generate_bullet_instance_type3:
# Pseduo code:
# create a bullet, id starts from 900
# store the id into the enemy_bullet_list and maintain the pointer
# get the location of the enemy
# store the location of the enemy to the bullet
# syscall 106 to create a bullet, with bullet_type is 4, 5 and 6
	move $a1, $v0
	move $a2, $v1
	
	jal find_empty_bullet
	li $a3, 4
	li $v0, 106
	syscall	
	
	jal find_empty_bullet
	li $a3, 5
	li $v0, 106
	syscall	
	
	jal find_empty_bullet
	li $a3, 6
	li $v0, 106
	syscall	

	jal continue_find_next_enemy

# Note: enemy type is different from bullet type. Enemy type 1: small enemy, 2: medium enemy, 3: large enemy
# small enemy: bullet_type 1, medium enemy: bullet_type 2 and 3, large enemy: bullet_type 4, 5 and 6

find_empty_bullet:
	addi $sp, $sp, -4
	sw $ra, 0($sp)
	
	addi $t1, $zero, -4
	find_empty_bullet_loop:
		addi $t1, $t1, 4                         # j += 4
		addi $t2, $zero, 400
		beq $t1, $t2, find_empty_bullet_exit     # j == 400
		
		# if id == -1, empty bullet
		la $t2, enemy_bullet_list              
		add $t2, $t2, $t1
		lw $t4, 0($t2)
		addi $t3, $zero, -1
		beq $t4, $t3, find_empty_bullet_success
		
		j find_empty_bullet_loop
		
	find_empty_bullet_success:
		srl $a0, $t2, 2
		addi $a0, $a0, 900
		sw $a0, 0($t2)
		j find_empty_bullet_exit
			
	find_empty_bullet_exit:
		lw $ra, 0($sp)
		addi $sp, $sp, 4
		jr $ra

generate_enemy_bullet_exit:
	lw $ra, 0($sp)
	addi $sp, $sp, 4
	jr $ra

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++}

#--------------------------------------------------------------------
# func: move_enemy_bullet
# Move the enemy's bullet
#--------------------------------------------------------------------
move_enemy_bullet:
	# find all the bullets in the enemy_bullet_list
	la $t0, enemy_bullet_list
	li $t3, -1

	j find_all_enemy_bullet

find_all_enemy_bullet:
	# get the first element of enemy_bullet_list
	lw $t1, ($t0)

	# if t3 == 100 then exit
	beq $t3, 100, move_enemy_bullet_exit
	addi $t3, $t3, 1

	# if t1 == -1, then continue
	beq $t1, -1, continue_find_next_enemy_bullet

	# get the location of the bullet
	move $a0, $t1
	li $v0, 110
	syscall

	move $s0, $v0 # x location
	move $s1, $v1 # y location
	andi $s2, $a1, 3 # type, here are only 3 types 0 1 2

	# if s2 == 1, move_enemy_bullet_down
	addi $t7, $zero, 1
	beq $s2, 1, move_enemy_bullet_down

	# if s2 == 2, move_enemy_bullet_right_down
	addi $t7, $zero, 2
	beq $s2, 2, move_enemy_bullet_right_down

	# if s2 == 0, move_enemy_bullet_left_down
	addi $t7, $zero, 0
	beq $s2, 0, move_enemy_bullet_left_down


continue_find_next_enemy_bullet:
	addi $t0, $t0, 4
	j find_all_enemy_bullet

move_enemy_bullet_down: # 1
	
	addi $s1, $s1, 3
	move $a0, $t1
	move $a1, $s0
	move $a2, $s1

	li $v0, 120
	syscall

	addi $t0, $t0, 4
	j find_all_enemy_bullet

move_enemy_bullet_right_down: # 0

	addi $s0, $s0, 2
	addi $s1, $s1, 3
	move $a0, $t1
	move $a1, $s0
	move $a2, $s1

	li $v0, 120
	syscall

	addi $t0, $t0, 4
	j find_all_enemy_bullet

move_enemy_bullet_left_down: # 2
	addi $s0, $s0, -2
	addi $s1, $s1, 3
	move $a0, $t1
	move $a1, $s0
	move $a2, $s1

	li $v0, 120
	syscall

	addi $t0, $t0, 4
	j find_all_enemy_bullet

move_enemy_bullet_exit:
	jr $ra

#--------------------------------------------------------------------
# func: destory_enemy_bullet
# Destory the enemy's bullet if it is out of the screen
#--------------------------------------------------------------------
destory_enemy_bullet:
	# find all the bullets in the enemy_bullet_list
	la $t0, enemy_bullet_list
	li $t3, -1

	j find_all_enemy_bullet_destory

find_all_enemy_bullet_destory:

	# get the first element of enemy_bullet_list
	lw $t1, ($t0)

	# if t3 == 100 then exit
	beq $t3, 100, destory_enemy_bullet_exit
	addi $t3, $t3, 1

	# if t1 == -1, then continue
	beq $t1, -1, continue_find_next_enemy_bullet_destory

	# get the location of the bullet
	move $a0, $t1
	li $v0, 110
	syscall

	move $s0, $v0 # x location
	move $s1, $v1 # y location
	andi $s2, $a1, 3 # type, here are only 3 types 0 1 2

	# if y location >= 700, destory the bullet
	addi $t7, $s1, -700
	bgez $t7, destory_enemy_bullet_destory

	addi $t0, $t0, 4
	j find_all_enemy_bullet_destory

continue_find_next_enemy_bullet_destory:
	addi $t0, $t0, 4
	j find_all_enemy_bullet_destory

destory_enemy_bullet_destory:
	# destory the bullet
	move $a0, $t1
	li $v0, 116
	syscall

	# set the bullet to -1
	addi $t2, $zero, -1
	sw $t2, ($t0)

	addi $t0, $t0, 4
	j find_all_enemy_bullet_destory

destory_enemy_bullet_exit:
	jr $ra

#--------------------------------------------------------------------
# func: collide_detection_enemy
# Detect whether the airplane crashes with the enemy
#--------------------------------------------------------------------

collide_detection_enemy:
	# get the location of the airplane
	li $v0, 110
	li $a0, 1 # id of the airplane
	syscall

	move $s0, $v0 # x location
	move $s1, $v1 # y location
	move $s7, $a2 # blood left

	# find all the enemies in the enemy_list
	la $t0, enemy_list
	li $t3, -1

	j find_all_enemy_collide

# TODO: add more contents here {

find_all_enemy_collide:
# Pseduo code:
# for each enemy in enemy_list:
# 	if enemy != -1:
#		get the location of the enemy with syscall 110
#		jump to collide_detection_enemy_with_airplane
#   else: continue to the next enemy
	addi $t0, $zero, -4                               # i = 0
	find_next_enemy:		
		# if i== 80
		addi $t0, $t0, 4                         # i += 4
		addi $t1, $zero, 80
		beq $t0, $t1, collide_detection_enemy_exit # i == 80
		# if i== 80, break
		
		# if enemy == -1
		la $t1, enemy_list
		add $t1, $t1, $t0
		lw $t1, 0($t1)                           # $t1 = enemy id
		addi $t2, $zero, -1
		beq $t1, $t2, find_next_enemy
		# if enemy == -1, continue

collide_detection_enemy_with_airplane:
# This is the basic function for collision detection, you can use this function to detect the collision between the airplane and the enemy
# These three collide_detection functions all have one basic function, they are extremely similar except for some minor different variables
# Pseduo code:
# x_enermy, y_enermy, width, height, x_self, y_self
# if (x_self <= x_enermy + width && x_self + 102 >= x_enermy && y_self <= y_enermy + height && y_self + 126 >= y_enermy), collide, where 102 is the width of the airplane, 126 is the height of the airplane
# if collide, destory the enemy, set the enemy to -1, blood left -= enemy attribute, score += enemy attribute, update the blood left, update the score, check the next enemy
# else: check the next enemy
	li $v0, 110
	move $a0, $t1
	syscall
	
	# x_self - x_enemy - width <= 0
	sub $t1, $s0, $v0
	li $t2, 16380 # 0000 0000 0000 1111 1111 1111 00
	and $t2, $a1, $t2
	srl $t2, $t2, 2
	sub $t1, $t1, $t2
	bgtz $t1, find_next_enemy
	
	# x_enemy - x_self - 102 <= 0
	sub $t1, $v0, $s0
	addi $t1, $t1, -102
	bgtz $t1, find_next_enemy
	
	# y_self - y_enemy - height <= 0
	sub $t1, $s1, $v1
	li $t2, 0x3ffc000 # 1111 1111 1111 0000 0000 0000 00
	and $t2, $a1, $t2
	srl $t2, $t2, 14
	sub $t1, $t1, $t2
	bgtz $t1, find_next_enemy
	
	# y_enemy - y_self - 126 <= 0
	sub $t1, $v1, $s1
	addi $t1, $t1, -126	
	bgtz $t1, find_next_enemy
	
	# destroy enemy
	la $t1, enemy_list
	add $t1, $t1, $t0
	li $t2, -1
	sw $t2, 0($t1)
	li $v0, 116
	syscall
	
	la $t4, score
	lw $t2, 0($t4)
	la $t4, left_blood
	lw $t3, 0($t4)
	add $t2, $t2, $a3
	sub $t3, $t3, $a3
	la $t4, score
	sw $t2, 0($t4)
	la $t4, left_blood
	sw $t3, 0($t4)
	move $a0, $t2
	move $a1, $t3
	li $v0 117
	syscall
	
	j find_next_enemy

# continue_find_next_enemy_collide:

collide_detection_enemy_exit:
 	jr $ra

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++}


#--------------------------------------------------------------------
# func: collide_detection_shoot_by_enemy
# Detect whether the airplane is shoot by the enemy
#--------------------------------------------------------------------
collide_detection_shoot_by_enemy:
	# get the location of the airplane
	li $v0, 110
	li $a0, 1 # id of the airplane
	syscall

	move $s0, $v0 # x location
	move $s1, $v1 # y location
	move $s7, $a2 # blood left

	# find all the bullets in the enemy_bullet_list
	# la $t0, enemy_bullet_list
	# li $t3, -1
	addi $t0, $zero, -4

	# j find_all_enemy_bullet_shoot

# TODO: add more contents here {
find_all_enemy_bullet_shoot:
# Pseduo code:
# for each bullet in enemy_bullet_list:
# 	if bullet != -1:
#		get the location of the bullet with syscall 110
#		jump to collide_detection_shoot_by_enemy_down
#   else: jump to continue to the next bullet
	addi $t0, $t0, 4                                     # j += 4
	addi $t2, $zero, 400
	beq $t0, $t2, collide_detection_shoot_by_enemy_exit  # j == 400
	
	# if id == -1, empty bullet
	la $t1, enemy_bullet_list              
	add $t1, $t1, $t0
	lw $t2, 0($t1)
	addi $t3, $zero, -1
	beq $t2, $t3, find_all_enemy_bullet_shoot
	
	move $a0, $t2
	li $v0, 110
	syscall

collide_detection_shoot_by_enemy_down:
# Basic function for collision detection, you can use this function to detect the collision between the airplane and the enemy's bullet
# Pseduo code:
# x_bullet, y_bullet, x_self, y_self
# if (x_self <= x_bullet + 5 && x_self + 102 >= x_bullet && y_self <= y_bullet + 11 && y_self + 126 >= y_bullet), collide, where 102 is the width of the airplane, 126 is the height of the airplane
# if collide, destory the bullet, set the bullet to -1, self blood left -= 1, score unchanged, check the next bullet
# else: check the next bullet
	
	# x_self - x_bullet - 5 <= 0
	sub $t1, $s0, $v0
	addi $t1, $t1, -5
	bgtz $t1, find_all_enemy_bullet_shoot

	# x_bullet - x_self - 102 <= 0
	sub $t1, $v0, $s0
	addi $t1, $t1, -102
	bgtz $t1, find_all_enemy_bullet_shoot
	
	# y_self - y_bullet - 11 <= 0
	sub $t1, $s1, $v1
	addi $t1, $t1, -11
	bgtz $t1, find_all_enemy_bullet_shoot
	
	# y_bullet - y_self - 126 <= 0
	sub $t1, $v1, $s1
	addi $t1, $t1, -126
	bgtz $t1, find_all_enemy_bullet_shoot

	la $t1, score
	la $t2, left_blood
	lw $a0, 0($t1)
	lw $a1, 0($t2)
	addi $a1, $a1, -1
	sw $a0, 0($t1)
	sw $a1, 0($t2)
	li $v0, 117
	syscall
	
	la $t1, enemy_bullet_list              
	add $t1, $t1, $t0
	lw $t2, 0($t1)
	move $a0, $t2
	li $v0, 116
	syscall
	li $t2, -1
	sw $t2, 0($t1)
	
	j find_all_enemy_bullet_shoot

# continue_find_next_enemy_bullet_shoot:

collide_detection_shoot_by_enemy_exit:
	jr $ra
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++}


#--------------------------------------------------------------------
# func: collide_detection_shoot_enemy
# Detect whether the enemy is shoot by the airplane
#--------------------------------------------------------------------
collide_detection_shoot_enemy:
	# find all the bullets in the bullet_list
	# la $t0, self_bullet_list
	# li $t3, -1 # like counter
	# j find_all_bullet
	li $t0, -4

# TODO: add more contents here {

find_all_bullet:
# Pseduo code:
# for each bullet in bullet_list:
# 	if bullet != -1:
#		get the location of the bullet with syscall 110
#		jump to collide_detection_shoot_enemy_down
#   else: jump to continue to the next bullet
	# if i == 20
	addi $t0, $t0, 4
	addi $t2, $zero, 80
	beq $t0, $t2, collide_detection_shoot_enemy_exit
	# if i == 20, break
	
	# if bullet == -1
	la $t1, self_bullet_list
	add $t1, $t1, $t0
	lw $t1, 0($t1)                           # $t1 = enemy id
	addi $t2, $zero, -1
	beq $t1, $t2, find_all_bullet
	# if bullet == -1, continue
	
	move $a0, $t1
	li $v0, 110
	syscall
	move $s0, $v0  # x
	move $s1, $v1  # y
	
	# j = -1
	li $t1, -4

# collide_detection_shoot_enemy_down:
	# get all the enemies in the enemy_list

	# la $t0, enemy_list
	# li $t5, -1 # like counter
	# j find_all_enemy_in_enemy_list

find_all_enemy_in_enemy_list:
# Pseduo code:
# for each enemy in enemy_list:
# 	if enemy != -1:
#		get the location of the enemy with syscall 110
#		jump to judge_hit_enermy
#   else: continue to the next enemy

	# if j == 20
	addi $t1, $t1, 4                         # j += 4
	addi $t2, $zero, 80
	beq $t1, $t2, find_all_bullet # j == 20
	# if j == 20, break
	
	la $t2, enemy_list
	add $t2, $t2, $t1
	lw $t2, 0($t2)
	addi $t3, $zero, -1
	beq $t2, $t3, find_all_enemy_in_enemy_list
	
	move $a0, $t2
	li $v0, 110
	syscall

# judge_hit_enermy:
# Basic function for collision detection, you can use this function to detect the collision between the enemy and the airplane's bullet.
# Pseduo code:
# x_bullet, y_bullet, width, height, x_enemy, y_enemy
# if (x_enemy <= x_bullet + 5 && x_enemy + width >= x_bullet && y_enemy <= y_bullet + 11 && y_enemy + height >= y_bullet), collide
# if collide, destory the bullet, set the bullet to -1, enemy blood left -= 1
# if enemy blood left <= 0, destory the enemy, set the enemy to -1, score += enemy attribute, update the score, check the next enemy
# else: check the next enemy
	
	# x_enemy - x_bullet - 5 <= 0
	sub $t2, $v0, $s0
	addi $t2, $t2, -5
	bgtz $t2, find_all_enemy_in_enemy_list
	
	# x_bullet - x_enemy - width <= 0
	sub $t2, $s0, $v0
	li $t3, 16380 # 0000 0000 0000 1111 1111 1111 00
	and $t3, $a1, $t3
	srl $t3, $t3, 2
	sub $t2, $t2, $t3
	bgtz $t2, find_all_enemy_in_enemy_list
	
	# y_enemy - y_bullet - 11 <= 0
	sub $t2, $v1, $s1
	addi $t2, $t2, -11
	bgtz $t2, find_all_enemy_in_enemy_list
	
	# y_bullet - y_enemy - height <= 0
	sub $t2, $s1, $v1
	li $t3, 0x3ffc000 # 1111 1111 1111 0000 0000 0000 00
	and $t3, $a1, $t3
	srl $t3, $t3, 14
	sub $t2, $t2, $t3
	bgtz $t2, find_all_enemy_in_enemy_list
	
	la $t2, enemy_list
	add $t2, $t2, $t1
	lw $t3, 0($t2)
	move $a0, $t3
	addi $a1, $a2, -1
	li $v0, 123
	syscall
	bgtz $a1, destroy_the_bullet
	
	# destroy the enemy
	li $v0, 116
	syscall
	li $t3, -1
	sw $t3, 0($t2)
	
	la $t3, score
	la $t4, left_blood
	lw $a0, 0($t3)
	lw $a1, 0($t4)
	add $a0, $a0, $a3
	sw $a0, 0($t3)
	sw $a1, 0($t4)
	li $v0, 117
	syscall
	
	# destroy the bullet
	destroy_the_bullet:
	la $t2, self_bullet_list
	add $t2, $t2, $t0
	lw $a0, 0($t2)
	li $v0, 116
	syscall
	li $t3, -1
	sw $t3, 0($t2)	

# continue_find_next_enemy_in_enemy_list:
# 	j find_all_enemy_in_enemy_list

# continue_find_next_bullet:
 	j find_all_bullet

collide_detection_shoot_enemy_exit:
	jr $ra

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++}



#--------------------------------------------------------------------
# func: get_time
# Get the current time
# $v0 = current time
#--------------------------------------------------------------------
get_time:	li $v0, 30
		syscall # this syscall also changes the value of $a1
		andi $v0, $a0, 0x3FFFFFFF # truncated to milliseconds from some years ago
		jr $ra

#--------------------------------------------------------------------
# func: have_a_nap(last_iteration_time, nap_time)
# Let the program sleep for a while
#--------------------------------------------------------------------
have_a_nap:
	addi $sp, $sp, -8
	sw $ra, 4($sp)
	sw $s0, 0($sp)
	add $s0, $a0, $a1
	jal get_time
	sub $a0, $s0, $v0
	slt $t0, $zero, $a0 
	bne $t0, $zero, han_p
	li $a0, 1 # sleep for at least 1ms
han_p:	li $v0, 32 # syscall: let mars java thread sleep $a0 milliseconds
	syscall
	lw $ra, 4($sp)
	lw $s0, 0($sp)
	addi $sp, $sp, 8
	jr $ra
